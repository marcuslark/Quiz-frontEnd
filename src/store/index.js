import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
    let postsArray = []

    snapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id

        postsArray.push(post)
    })

    store.commit('setPosts', postsArray)
})






/*fb.usersCollection.orderBy('highScore', 'desc').onSnapshot(snapshot => {
    let highScoreArray = []

    snapshot.forEach(doc => {
        let highScore = doc.data()
        highScore.id = doc.id

        highScoreArray.push(highScore)
    })

    console.log('********highScoreArray**********')
    console.log(highScoreArray)

    for (let i = 0; i < highScoreArray.length; i++) {
        console.log('i for loop, name: ' + highScoreArray[i].name + ', highScore: ' + highScoreArray[i].highScore)
    }
    console.log('*********highScoreArray*********')

    store.commit('setHighScores', highScoreArray)
})*/




/*let highScoreArray = []*/
let userProfile = [];
/*let allHighScores = [];*/
const store = new Vuex.Store({
    state: {
        userProfile: {},
        posts: []/*,
        highScores: []*/
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPerformingRequest(state, val) {
            state.performingRequest = val
        },
        setPosts(state, val) {
            state.posts = val
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
            userProfile = await fb.usersCollection.doc(user.uid).get()

            /*console.log('********fetchUserProfile**********')
            console.log(userProfile.data().name + ' highScore from db: ' + userProfile.data().highScore)
            console.log('*********fetchUserProfile*********')*/

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },


        async fetchAllHighScores() {
            console.log('fetchAllHighScores i store/index.js körs')
            /*fb. getInstance().clearLocalCache()*/
            localStorage.clear()

            /*var dbRef = fb.usersCollection.doc()  database().ref("users");

            dbRef.orderByChild("highScore").on("child_added", snap => {
                console.log(snap.val());
            });*/

            await fb.usersCollection.orderBy('highScore', 'desc')
                .get()
                .then((querySnapshot) => {



           /* fb.usersCollection.orderBy('highScore', 'desc').onSnapshot(snapshot => {*/
                /*let highScoreArray = []*/
                let highScores = [];

                querySnapshot.forEach(doc => {
                    let highScore = doc.data()
                    highScore.id = doc.id

                    highScores.push(highScore)
                })

                console.log('********fetchAllHighScores**********')
                /*console.log(highScores)*/

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
            /*router.push('/login')*/
            location.reload()
        },
        // eslint-disable-next-line no-unused-vars
        async createPost({ state, commit }, post) {
            // create post in firebase
            await fb.postsCollection.add({
                createdOn: new Date(),
                content: post.content,
                userId: fb.auth.currentUser.uid,
                userName: state.userProfile.name,
                comments: 0,
                likes: 0
            })
        },
        // eslint-disable-next-line no-unused-vars
        async likePost ({ commit }, post) {
            const userId = fb.auth.currentUser.uid
            const docId = `${userId}_${post.id}`

            // check if user has liked post
            const doc = await fb.likesCollection.doc(docId).get()
            if (doc.exists) { return }

            // create post
            await fb.likesCollection.doc(docId).set({
                postId: post.id,
                userId: userId
            })

            // update post likes count
            fb.postsCollection.doc(post.id).update({
                likes: post.likesCount + 1
            })
        },
        async updateProfile({ dispatch }, user) {

            let dbHighScore = userProfile.data().highScore;
            let score = user.highScore;
            let dbUserLevel = userProfile.data().level;
            /*let level = user.dbUserLevel;*/
            console.log('dbUserLevel: ' + dbUserLevel)
            if (score > dbHighScore) {
                const userId = fb.auth.currentUser.uid

                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    highScore: user.highScore
                })

                dispatch('fetchUserProfile', { uid: userId })
            }

            if (score === 1) {
                console.log('i if-sats i updateProfile 1')
                dbUserLevel++
                console.log('dbUserLevel: ' + dbUserLevel)
                const userId = fb.auth.currentUser.uid
                console.log('i if-sats i updateProfile 2')
                // update user object
                // eslint-disable-next-line no-unused-vars
                await fb.usersCollection.doc(userId).update({
                    level: dbUserLevel
                })
                console.log('i if-sats i updateProfile 3')


                dispatch('fetchUserProfile', { uid: userId })
                /*store.commit('setUserLevels', dbUserLevel)*/
            }


            /*// update all posts by user
            const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
            postDocs.forEach(doc => {
                fb.postsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })

            // update all comments by user
            const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
            commentDocs.forEach(doc => {
                fb.commentsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })*/
        }
    }
})

export default store