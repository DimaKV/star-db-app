import React, {Component} from 'react';
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
    if(prevProps.getData != this.props.getData){
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
      return <View {...this.props} 
                        data={data} 
                        error={error} 
                        loading={loading}  />
    }
  }
}

  export default withData;