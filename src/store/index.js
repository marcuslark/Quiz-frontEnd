import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

let dbUserLevel;


const store = new Vuex.Store({
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setHighScores(state, val) {
            state.highScores = val
        },
        setUserLevels(state, val) {
            state.dbUserLevel = val
        }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
            location.reload()
        },
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title,
                highScore: 0,
                level: 1
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
            location.reload()
        },
        async fetchUserProfile({ commit }, user) {

            // fetch user profile
            this.userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', this.userProfile.data())

            console.log('i fetchUserProfile, name: ' + this.userProfile.data().name)

            localStorage.setItem(
                'ActivePlayerLevel', this.userProfile.data().level
            )

            localStorage.setItem(
                'ActivePlayerName', this.userProfile.data().name
            )

            console.log('dbUserLevel ' + this.userProfile.data().level)

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },
        async fetchAllHighScores() {
            console.log('fetchAllHighScores i store/index.js körs')
            localStorage.removeItem(
                'HighScores')

            await fb.usersCollection.orderBy('highScore', 'desc')
                .get()
                .then((querySnapshot) => {

                let highScores = [];

                querySnapshot.forEach(doc => {
                    let highScore = doc.data()
                    highScore.id = doc.id

                    highScores.push(highScore)
                })

                for (let i = 0; i < highScores.length; i++) {
                    localStorage.setItem(
                        'HighScores', localStorage.getItem('HighScores') + ',' + highScores[i].name + ' ' + highScores[i].highScore
                    )
                }

                store.commit('setHighScores', highScores)

            })
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            localStorage.clear()
            location.reload()
        },
        async updateProfile({ dispatch }, user) {
            const userId = fb.auth.currentUser.uid
            console.log('this.userProfile.data().highScore: ' + this.userProfile.data().highScore)
            let dbHighScore = await this.userProfile.data().highScore;
            let score = user.highScore;

            dbUserLevel = this.userProfile.data().level;
            console.log('dbUserLevel: ' + dbUserLevel)
            if (score > dbHighScore) {

                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    highScore: user.highScore
                })

                dispatch('fetchUserProfile', { uid: userId })
            }

            if (score === 10) {
                dbUserLevel++
                console.log('dbUserLevel if score === 10: ' + dbUserLevel)
                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    level: dbUserLevel
                })

                dispatch('fetchUserProfile', { uid: userId })

            }

            if (score === -1) {
                dbUserLevel--
                console.log('dbUserLevel if score === -1: ' + dbUserLevel)
                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    level: dbUserLevel
                })

                dispatch('fetchUserProfile', { uid: userId })

            }
        },
    }
})

export default store