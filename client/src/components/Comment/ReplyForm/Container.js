import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { attemptCreateSubComment } from '../../../actions/posts';
import CommentForm from './Component';

const mapDispatchToProps = { attemptCreateSubComment };

const enhance = compose(
  reduxForm({ form: 'reply' }),
  connect(
    null,
    mapDispatchToProps
  )
);

const CommentFormContainer = enhance(CommentForm);

export default CommentFormContainer;
