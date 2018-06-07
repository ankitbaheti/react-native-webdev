import React, {Component} from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'


class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
        lessonId: 1,
        widgetType: "Assignment"
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
      this.setState({lessonId: lessonId});
    fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
  }
  render() {
    return(
      <View style={{padding: 15, margin: 10}}>
          <Button title="Show All Assignments"
                  style={{margin: 5}}
                  onPress={() => this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId})}/>
          <Button title="Show All Exams"
                  style={{margin: 5}}
                  onPress={() => this.props.navigation.navigate("ShowExam", {lessonId: this.state.lessonId})}/>
      </View>
    )
  }
}
export default WidgetList