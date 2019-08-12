import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.postToEdit) {
      this.setState({
        title: nextProps.postToEdit.title,
        body: nextProps.postToEdit.body,
        author: nextProps.postToEdit.author,
      });
    }
  }

  handleSubmit(){
    const { onSubmit, postToEdit, onEdit } = this.props;
    const { title, body, author } = this.state;

    if(!postToEdit) {
      return axios.post('https://newreactapps.herokuapp.com/api/posts', {
        title,
        body,
        author,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      return axios.patch(`https://newreactapps.herokuapp.com/api/posts/${postToEdit._id}`, {
        title,
        body,
        author,
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { postToEdit } = this.props;
    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={(ev) => this.handleChangeField('title', ev)}
          value={title}
          className="form-control my-3"
          placeholder="Post Title"
        />
        <textarea
          onChange={(ev) => this.handleChangeField('body', ev)}
          className="form-control my-3"
          placeholder="Post Body"
          value={body}>
        </textarea>
        <input
          onChange={(ev) => this.handleChangeField('author', ev)}
          value={author}
          className="form-control my-3"
          placeholder="Post Author"
        />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{postToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_POST', data }),
  onEdit: data => dispatch({ type: 'EDIT_POST', data }),
});

const mapStateToProps = state => ({
  postToEdit: state.home.postToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
