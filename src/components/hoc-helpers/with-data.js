import React, {Component} from 'react';
const withData = (View, getData) => {
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
    this.getPeople();    
  }

  onError() {
    this.setState({
      error: true,
      loading: false
    })
  }

  //получаем список людей через API
  getPeople = () => {      
    getData()
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
      return <View {...this.props} 
                        data={data} 
                        error={error} 
                        loading={loading}  />
    }
  }
}

  export default withData;