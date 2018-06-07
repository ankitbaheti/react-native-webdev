import React from 'react'
import {Picker, View, ScrollView} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'

class QuestionsForExam extends React.Component {

    constructor(props){
        super(props)
        this.state={
            questions:[],
            questionType: "MC",
            examId: 1,
            lessonId: 1
        }
        this.createQuestion = this.createQuestion.bind(this)
        this.navigateTo = this.navigateTo.bind(this)
        this.deleteExam = this.deleteExam.bind(this)
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId")
        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({examId: examId})
        this.setState({lessonId: lessonId})
        fetch("http://localhost:8080/api/exam/"+examId+"/questions")
            .then(response => (response.json()))
            .then(questions => {
                this.setState({questions: questions})
            })

    }

    componentWillReceiveProps(newProps) {
        const newExamId = newProps.navigation.getParam("examId")
        fetch("http://localhost:8080/api/exam/" + newExamId + "/questions")
            .then(response => (response.json()))
            .then(questions => {
                this.setState({questions: questions})
            })
    }

    deleteExam(){
        return fetch("http://localhost:8080/api/exam/"+this.state.examId,{
            method: 'DELETE'
        })
    }


    createQuestion(){
        if(this.state.questionType === "MC")
            this.props.navigation.navigate("MultipleChoice", {examId: this.state.examId})
        else if(this.state.questionType === "ES")
            this.props.navigation.navigate("Essay", {examId: this.state.examId})
        else if(this.state.questionType === "TF")
            this.props.navigation.navigate("TrueFalse", {examId: this.state.examId})
        else if (this.state.questionType === "FB")
            this.props.navigation.navigate("FillBlank", {examId: this.state.examId})
    }

    navigateTo(question, questionType){
        if(questionType === "Essay")
            this.props.navigation.navigate("Essay", {examId: this.state.examId, editable: true, question: question})
        else if(questionType === "True Or False")
            this.props.navigation.navigate("TrueFalse", {examId: this.state.examId, editable: true, question: question})
        else if(questionType === "Multiple Choice Question")
            this.props.navigation.navigate("MultipleChoice", {examId: this.state.examId, editable: true, question: question})
        else if(questionType === "Fill In The Blank")
            this.props.navigation.navigate("FillBlank", {examId: this.state.examId, editable: true, question: question})
    }

    showIcon(qtype){
        if(qtype === "Essay")
            return {name: 'subject'};
        else if(qtype === "True Or False")
            return {name: 'check'};
        else if(qtype === "Multiple Choice Question")
            return {name: 'list'};
        else if(qtype === "Fill In The Blank")
            return {name: 'code'}

    }

    render() {
        return (
            <ScrollView>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => this.navigateTo(question, question.type)}
                            key={index}
                            leftIcon={this.showIcon(question.type)}
                            subtitle={question.type}
                            title={question.title}/>))}
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                <Button title="create question"
                        backgroundColor="blue"
                        style={{margin: 5}}
                        onPress={() => this.createQuestion() }/>
                <Button title="delete Exam"
                        backgroundColor="red"
                        style={{margin: 5}}
                        onPress={() => {
                            this.deleteExam();
                            this.props.navigation.navigate("ShowExam",{lessonId: this.state.lessonId})}}/>
            </ScrollView>
        )
    }
}

export default QuestionsForExam