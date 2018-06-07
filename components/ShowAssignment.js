import React from 'react'
import {View} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'


class ShowAssignment extends React.Component{

    static navigationOptions = {title: 'All Assignments'}
    constructor(props){
        super(props)
        this.state = {
            lessonId: 1,
            assignments:[]
        }
    }

    componentDidMount() {


        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        fetch("http://localhost:8080/api/lesson/"+lessonId+"/assignment")
            .then(response => (response.json()))
            .then(assignments => {
                this.setState({assignments: assignments})
            })

    }

    componentWillReceiveProps(newProps){
        const newLessonId = newProps.navigation.getParam("lessonId")
        fetch("http://localhost:8080/api/lesson/"+newLessonId+"/assignment")
            .then(response => (response.json()))
            .then(assignments => {
                this.setState({assignments: assignments})
            })
    }

    render(){
        return (
            <View>
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("Assignment", {assignment: assignment, lessonId: this.state.lessonId, editable: true})}
                            key={index}
                            leftIcon={{name: 'subject'}}
                            subtitle={assignment.description}
                            title={assignment.title}/>))}
                <Button title="Create Assignment"
                        style={{margin: 5}}
                        onPress={() => this.props.navigation
                            .navigate("Assignment", {lessonId: this.state.lessonId}) }/>
            </View>
        )
    }
}

export default ShowAssignment