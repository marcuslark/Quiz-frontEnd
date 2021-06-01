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
        },
        async fetchUserProfile({ commit }, user) {

            // fetch user profile
            this.userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', this.userProfile.data())

            console.log('i fetchUserProfile, userProfile: ' + this.userProfile.data().level)

            localStorage.setItem(
                'ActivePlayerLevel', this.userProfile.data().level
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

                console.log('********fetchAllHighScores**********')

                for (let i = 0; i < highScores.length; i++) {
                    console.log(i + ' i for loop, name: ' + highScores[i].name + ', highScore: ' + highScores[i].highScore + ' highScores.length: ' + highScores.length)
                    localStorage.setItem(
                        'HighScores', localStorage.getItem('HighScores') + ',' + highScores[i].name + ' ' + highScores[i].highScore
                    )
                }
                console.log('*********fetchAllHighScores*********')

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
            console.log('*** index AAAAAAAAAA')
            console.log(this.userProfile.data().highScore)
            console.log('*** index AAAAAAAAAA')
            let dbHighScore = await this.userProfile.data().highScore;
            let score = user.highScore;
            console.log('index AAAAAAAAAA dbHighScore ' + dbHighScore)
            console.log('index AAAAAAAAAA score ' + dbHighScore)

            // await fb.usersCollection.doc(userId).update({
            //     level: dbUserLevel
            // })

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
                console.log('i if-sats i updateProfile 1')
                dbUserLevel++
                console.log('dbUserLevel: ' + dbUserLevel)
                console.log('i if-sats i updateProfile 2')
                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    level: dbUserLevel
                })

                dispatch('fetchUserProfile', { uid: userId })

            }

            if (score === -1) {
                console.log('i if-sats i updateProfile 1')
                dbUserLevel--
                console.log('dbUserLevel: ' + dbUserLevel)
                console.log('i if-sats i updateProfile 2')
                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    level: dbUserLevel
                })

                dispatch('fetchUserProfile', { uid: userId })

            }

        },
        /*async downgradeLevel({ dispatch }, user) {
            const userId = fb.auth.currentUser.uid
            console.log('***')
            console.log('userId: ' + userId + ' in downgradeLevel()')
            console.log('***')

            await fb.usersCollection.doc(userId).update({
                level: dbUserLevel
            })

            dispatch('fetchUserProfile', { uid: userId })
        },
        async upgradeLevel({ dispatch }) {
            const userId = fb.auth.currentUser.uid
            console.log('***')
            console.log('userId: ' + userId + ' in upgradeLevel()')
            console.log('***')

            await fb.usersCollection.doc(userId).update({
                level: dbUserLevel
            })

            dispatch('fetchUserProfile', { uid: userId })
        }*/
    }
})

export default store