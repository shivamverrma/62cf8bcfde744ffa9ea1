import React, { Component } from 'react'
import axios from "axios"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default class Home extends Component {
    state = {
        posts : [],
        pagenumber : 0
    }

    pageIncrement(){
        this.setState({
            pagenumber: this.state.pagenumber+1,
        })
    }
    
    
    componentDidMount(){
        this.getPost(this.state.pagenumber);
        this.interval = setInterval(() => {
            this.getPost(this.state.pagenumber);
          }, 10000);
        
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    getPost=pagenumber=>{
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pagenumber}`).then(
            res=> {
                console.log(res.data.hits);
                this.setState({
                    //posts: res.data.hits,
                    posts: [
                        ...this.state.posts,
                        ...res.data.hits]
                })
            }
        )
    }
    render() {
        return (
<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Author</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {this.state.posts.map(post=>(
            <TableRow key={post.created_at}>
              <TableCell component="th" scope="row">
              {post.title}
              </TableCell>
              <TableCell align="right">{post.url}</TableCell>
              <TableCell align="right">{post.created_at}</TableCell>
              <TableCell align="right">{post.author}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    }
}
