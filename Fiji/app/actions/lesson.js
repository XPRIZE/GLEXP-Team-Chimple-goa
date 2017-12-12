import firebase from 'react-native-firebase'

export const startFetchingLessonCards = () => ({
  type: 'START_FETCHING_LESSON_CARDS'
})

export const receivedLessonCards = (cards) => ({
  type: 'RECEIVED_LESSON_CARDS',
  cards
})

export const failedFetchingLessonCards = () => ({
  type: 'FAILED_FETCHING_LESSON_CARDS'
})

export const fetchLessonCards = (lessonId) => {
  return function(dispatch) {
    dispatch(startFetchingLessonCards())
    firebase.firestore().collection('restaurants')
      .where("city", "==", lessonId).get().then(
        querySnapShot => {
          const cards = []
          querySnapShot.forEach((doc) => {
            const { name, photo, city } = doc.data()
            cards.push({
              key: doc.id,
              title: name,
              audio: city,
              image: photo
            })
          })
          dispatch(receivedLessonCards(cards))
        },
        error => console.log(error)
      )
  }
}

export const startFetchingLessons = () => ({
  type: 'START_FETCHING_LESSONS'
})

export const receivedLessons = (lessons) => ({
  type: 'RECEIVED_LESSONS',
  lessons
})

export const failedFetchingLessons = () => ({
  type: 'FAILED_FETCHING_LESSONS'
})

export const fetchLessons = ( courseId ) => {
  return function(dispatch) {
    dispatch(startFetchingLessons())
    firebase.firestore().collection(`courses/sQEiXBVITFfrKKBl3iwl/lessons`)
      .orderBy("order").get().then(
        querySnapShot => {
          const lessons = []
          querySnapShot.forEach((doc) => {
            const { description, order, photo, object, subject, items } = doc.data()
            lessons.push({
              key: doc.id,
              description,
              order,
              photo,
              object,
              subject,
              items
            })
          })
          dispatch(receivedLessons(lessons))
        },
        error => console.log(error)
      )
  }
}