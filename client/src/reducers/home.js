export default (state={posts: []}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        posts: action.data.posts,
      };
    case 'SUBMIT_POST':
      return {
        ...state,
        posts: ([action.data.post]).concat(state.posts),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        postToEdit: action.post,
      };
    case 'EDIT_POST':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if(post._id === action.data.post._id) {
            return {
              ...action.data.post,
            }
          }
          return post;
        }),
        postToEdit: undefined,
      }
    default:
      return state;
  }
};
