import firebase from 'react-native-firebase'

export const startFetchingCourses = () => ({
  type: 'START_FETCHING_COURSES'
})

export const receivedCourses = (courses) => ({
  type: 'RECEIVED_COURSES',
  courses
})

export const failedFetchingCourses = () => ({
  type: 'FAILED_FETCHING_COURSES'
})

export const fetchCourses = () => {
  return function(dispatch) {
    dispatch(startFetchingCourses())
    firebase.firestore().collection('courses')
      .get().then(
        querySnapShot => {
          const courses = []
          querySnapShot.forEach((doc) => {
            const { name, description, language, languageRef, photo } = doc.data()
            cards.push({
              key: doc.id,
              name: name,
              description: description,
              language: language,
              languageRef: languageRef,
              photo: photo
            })
          })
          dispatch(receivedCourses(courses))
        },
        error => console.log(error)
      )
  }
}