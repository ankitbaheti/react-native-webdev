import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
  static navigationOptions = {title: 'Lessons'}
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      courseId: 1,
      moduleId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const moduleId = navigation.getParam("moduleId")
    fetch("http://localhost:8080/api/"+"/module/"+moduleId+"/lesson")
      .then(response => (response.json()))
      .then(lessons => this.setState({lessons}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.lessons.map(
        (lesson, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("WidgetList", {lessonId: lesson.id})}
            key={index}
            title={lesson.title}/>))}
      </View>
    )
  }
}
export default LessonList