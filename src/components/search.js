import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { compose, withState, withReducer, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import _ from 'lodash';

const Input = styled.input`
  width: 400px;
  height: 20px;

  `;

const SearchBar = styled.div`
  width: 480px;
  height: 40px;
  background-color: rgba( 255,255,255,0.6);
  top: 0px;
  margin: 0 auto;
  padding-top: 10px;
  left: 20%;
  text-align: center;
  /* transform: translateX(-40px); */
  position: absolute;
  z-index: 10;
  pointer-events: auto;
  &:hover {
		background-color: yellow;
	}
`;

const BaseSearch = ( props, dispatch ) => {
  // console.log(props, dispatch);
// const setInputValue = _.debounce((inputValue) => { this.setInputValue(event.target.value) }, 300);
  return (
    <SearchBar>
      <Input value={props.inputValue} onChange={event => props.setInputValue(event.target.value)} />
    </SearchBar>
  );
}

export const searchVideoReducer = (state = {}, action) => {
  //console.log(state, action);
  switch (action.type) {
    case 'SEARCH_VIDEO':

      const request = gapi.client.youtube.search.list({
        q: action.payload,
        part: 'snippet'
      });

      request.execute(function (response) {
        const videos = JSON.stringify(response.result);
        return { videos };
      });

    default:
      return state;
  }
}

//const debounceDispatch = _.debounce((inputValue) => { dispatch({ type: 'SEARCH_VIDEO' }); }, 300);
export const Search = compose(
  connect(),
  withHandlers(
    // ( props, initialValue = '') => (
    //   console.log(props),
    //   {
    //   inputValue: initialValue,
    // },
    {
      setInputValue:
        (props, inputValue) => {
          console.log(props);
          return (inputValue) => {
            console.log('inputValue :', inputValue);
            // console.log(props);
            // debounceDispatch();
            return ({
              inputValue: inputValue,
            })
          };
        }
    }//)
  )
)(BaseSearch);

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id))
// })

// export const Search = (SearchComposed);

