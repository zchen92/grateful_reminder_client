import React, {Component} from 'react';
// import Chart from 'chart.js'

class Diaries extends Component {

    // state = {
    //    diaries: []
    // }

    // componentDidMount() {
    //     this.getData()
    // }

    // getData = () => {
    //     fetch('http://localhost:3000/diaries')
    //         .then(response => response.json())
    //         .then(json => this.setState({diaries :json}))
    //    	.catch(error => console.error(error))
    // }

    // prepareData = (data) => {
    //     const chartData = {
    //         labels: [],
    //         datasets: [
    //             {
    //                 label: "Happiness",
    //                 data: []
    //             }
    //         ]
    //     }
    //     data.diaries.forEach(diary => {
    //         console.log(diary.id)
    //         chartData.labels.push(diary.id)
    //         chartData.datasets[0].data.push(diary.happiness)
            
    //     })

    //     return chartData
    // }

    // createChart = (data) => {
    //     const ctx = document.querySelector('#diaries');
    //     const happinessChart = new Chart(ctx, {
    //         type: 'line', 
    //         data: data 
    //     })

    // }

    state = {
        date: '',
        happiness: '',
        grateful1: '',
        grateful2: '',
        grateful3: ''
    }

    handleDateChange = (event) => {
        this.props.diaryToEdit.date =event.target.value
        this.setState({[event.target.id]:event.target.value})
    }
    
    handleHappinessChange = (event) => {
        this.props.diaryToEdit.happiness =event.target.value
        this.setState({[event.target.id]:event.target.value})
    }

    handleGrateful1Change = (event) => {
        this.props.diaryToEdit.grateful1 =event.target.value
        this.setState({[event.target.id]:event.target.value})
    }

    handleGrateful2Change = (event) => {
        this.props.diaryToEdit.grateful2 =event.target.value
        this.setState({[event.target.id]:event.target.value})
    }

    handleGrateful3Change = (event) => {
        this.props.diaryToEdit.grateful3 =event.target.value
        this.setState({[event.target.id]:event.target.value})
    }


    render(){
        console.log(this.props.diaryToEdit)
        return(
            <>
            {/* <canvas id="diaries" width="400" height="150"></canvas> */}
            {this.props.content.map((diary,index) => {
                if(this.props.isEditing) {
                    if(this.props.diaryToEdit.id === diary.id)
                    return(
                        <>
                        <h1>Editing my post</h1>
                        <form onSubmit={(event)=>this.props.handleUpdate(event, this.props.diaryToEdit)}>
                            <label htmlFor="date">Date</label>
                            <input type="text" id="date" value={this.props.diaryToEdit.date}
                                onChange={this.handleDateChange}/>
                            <label htmlFor="happiness">Happiness Level</label>
                            <input type="number" id="happiness" value={this.props.diaryToEdit.happiness}
                                onChange={this.handleHappinessChange}/>
                            <label htmlFor="content">Today I'm grateful for...#1</label>
                            <input type="text" id="grateful1" value={this.props.diaryToEdit.grateful1}
                                onChange={this.handleGrateful1Change} />
                            <label htmlFor="content">Today I'm grateful for... #2</label>
                            <input type="text" id="grateful2" value={this.props.diaryToEdit.grateful2}
                                onChange={this.handleGrateful2Change} />
                            <label htmlFor="content">Today I'm grateful for... #3</label>
                            <input type="text" id="grateful3" value={this.props.diaryToEdit.grateful3}
                                onChange={this.handleGrateful3Change}/>
                            <input type="submit" className="submit" />
                        </form>
                        </>
                    )
                } else 
                    return(
                        <div key={diary.id} className="diary">
                            <h3>Date: {diary.date}</h3>
                            <h4>Happiness Level(1-10): {diary.happiness}</h4>
                            <p>Grateful Thought #1: {diary.grateful1}</p>
                            <p>Grateful Thought #2:{diary.grateful2}</p>
                            <p>Grateful Thought #3:{diary.grateful3}</p>
                            <button onClick={()=>this.props.handleDelete(diary.id,index)}>DELETE ENTRY</button>
                            <button onClick={()=>this.props.toggleEdit(diary)}>UPDATE ENTRY</button>
                        </div>
                    )
                })}
            </>
        )
    }
}
export default Diaries;
