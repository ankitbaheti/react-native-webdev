import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'


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
    fetch("http://10.0.0.197:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {/*{this.state.widgets.map(*/}
        {/*(widget, index) => (*/}
          {/*<ListItem*/}
            {/*onPress={() => this.props.navigation*/}
              {/*.navigate("QuestionList", {examId: widget.id})}*/}
            {/*key={index}*/}
            {/*subtitle={widget.description}*/}
            {/*title={widget.title}/>))}*/}

            <Button title="Go To Assignment" onPress={() => this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId})}/>
          <Button title="Go To Exam"/>

            {/*<Picker*/}
              {/*onValueChange={(itemValue, itemIndex) =>*/}
                  {/*this.setState({widgetType: itemValue})}*/}
              {/*selectedValue={this.state.widgetType}>*/}
              {/*<Picker.Item value="Assignment" label="Assignment" />*/}
              {/*<Picker.Item value="Exam" label="Exam" />*/}
          {/*</Picker>*/}
          {/*<Button title="create"*/}
              {/*onPress={() => this.props.navigation*/}
                      {/*.navigate(this.state.widgetType) } />*/}


      </View>
    )
  }
}
export default WidgetList