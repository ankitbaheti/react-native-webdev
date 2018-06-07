import React from 'react';
import {View} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'

class ShowExam extends React.Component{

    static navigationOptions = {title: 'All Exams'};
    constructor(props){
        super(props)
        this.state = {
            lessonId: 1,
            exams:[]
        }
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        fetch("http://localhost:8080/api/lesson/"+lessonId+"/exam")
            .then(response => (response.json()))
            .then(exams => {
                this.setState({exams: exams})
            })

    }

    componentWillReceiveProps(newProps){
        const newLessonId = newProps.navigation.getParam("lessonId")
        fetch("http://localhost:8080/api/lesson/"+newLessonId+"/exam")
            .then(response => (response.json()))
            .then(exams => {
                this.setState({exams: exams})
            })
    }

    render(){
        return(
            <View>
                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionsForExam", {examId: exam.id, lessonId: this.state.lessonId})}
                            key={index}
                            leftIcon={{name: 'subject'}}
                            subtitle={exam.description}
                            title={exam.title}/>))}
                <Button title="create Exam"
                        style={{margin: 5}}
                        onPress={() => this.props.navigation
                            .navigate("Exam", {lessonId: this.state.lessonId}) }/>
            </View>
        )
    }
}

export default ShowExam