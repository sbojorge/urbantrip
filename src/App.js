import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostChooseMedia from "./pages/posts/PostChooseMedia";
import NotFound from "./components/NotFound";
import PostCreateFormPicture from "./pages/posts/PostCreateFormPicture";
import PostCreateFormVideo from "./pages/posts/PostCreateFormVideo";
import PostPage from "./pages/posts/PostPage";
import PostEditForm from "./pages/posts/PostEditForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/posts/create"
            render={() => <PostChooseMedia />}
          />
          <Route
            exact
            path="/posts/create/image"
            render={() => <PostCreateFormPicture />}
          />
          <Route
            exact
            path="/posts/create/video"
            render={() => <PostCreateFormVideo />}
          />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
