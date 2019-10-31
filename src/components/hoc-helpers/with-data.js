import React, {Component} from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component{      

  constructor(props){
    super(props);
    this.state = {
      data: [
        {name: 'test', id: 1}
      ],
      loading: true,
      error: false
    }
  }  

  componentDidMount(){            
    this.update();    
  }

  //проверяе на сменился ли источник данных
  componentDidUpdate(prevProps){
    if(prevProps.getData !== this.props.getData){
      this.update();
    }
  }

  onError() {
    this.setState({
      error: true,
      loading: false
    })
  }

  //получаем список людей через API
  update = () => {      
   this.props.getData()
      .then( (data) => {        
        this.setState({
          data,
          loading: false          
        });
      } )
      .catch(() => {
        this.onError();
      })
  }
    
  

    render(){
      const {data, error, loading} = this.state;
      
      if (loading) return <Spinner/>;
      if (error) {
        this.setState({loading:false})
        return <ErrorIndicator/>;
      }
      
      return <View {...this.props} 
                        data={data}                       
                          />
    }
  }
}

  export default withData;