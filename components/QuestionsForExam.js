import React from 'react'
import {Picker, View} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'

class QuestionsForExam extends React.Component {

    constructor(props){
        super(props)
        this.state={
            questions:[],
            questionType: "MC",
            examId: 1
        }
        this.createQuestion = this.createQuestion.bind(this)
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId")
        this.setState({examId: examId})
        // fetch("http://10.0.0.197:8080/api/lesson/"+lessonId+"/exam")
        //     .then(response => (response.json()))
        //     .then(exams => {
        //         this.setState({exams: exams})
        //     })

    }

    createQuestion(){
        if(this.state.questionType === "MC")
            this.props.navigation.navigate("MultipleChoice", {examId: this.state.examId})
        else if(this.state.questionType === "ES")
            this.props.navigation.navigate("Essay", {examId: this.state.examId})
        else if(this.state.questionType === "TF")
            this.props.navigation.navigate("TrueFalse", {examId: this.state.examId})
        else if(this.state.questionType === "FB")
            this.props.navigation.navigate("FillBlank", {examId: this.state.examId})
    }

    render() {
        return (
            <View>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            // onPress={() => this.props.navigation
                            //     .navigate("QuestionsForExam", {examId: exam.id})}
                            key={index}
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
                        onPress={() => this.createQuestion() }/>
            </View>
        )
    }
}

export default QuestionsForExam