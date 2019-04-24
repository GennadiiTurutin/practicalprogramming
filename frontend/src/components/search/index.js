import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchProduct} from '../../actions'



class Search extends Component {
	constructor (props) {
		super(props)
		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	}

	handleChange (event) {
		this.setState({
			value: event.target.value
		})
	}

	handleSubmit (event) {
		event.preventDefault()
		this.props.searchProduct(this.state.value)
	}

	render() {
		return (
                <div className="container">
			    <form onSubmit={this.handleSubmit}>
			      <input 
				    onChange={this.handleChange}
				    type='text'
				    placeholder='Search ...' 
				    className='form-control'/>
			    </form>
			    </div>
		)
	}
}


const mapDispatchToProps = {
	searchProduct
}

export default connect(null, mapDispatchToProps)(Search)