
// let _singleton = Symbol();
// export default class AssignmentService {
//     constructor(singletonToken) {
//         if (_singleton !== singletonToken)
//             throw new Error('Singleton!!!');
//     }
//
//     static get instance() {
//         if(!this[_singleton])
//             this[_singleton] = new AssignmentService(_singleton);
//         return this[_singleton]
//     }
//
//     createAssignment(lessonId, title, description, points) {
//         return fetch("http://10.0.0.197:8080/api/lesson/"+lessonId+"/assignment",{
//             body: JSON.stringify({title: title,
//                 description: description,
//                 points: points}),
//             headers: { 'Content-Type': 'application/json' },
//             method: 'POST'
//         }).then(function (response){
//             return response.json();
//         })
//     }
//
//
// }