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
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ContactCreateForm from "./pages/contacts/ContactCreateForm";
import ServiceCreateForm from "./pages/services/ServiceCreateForm";
import ServicePage from "./pages/services/ServicePage";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceEditForm from "./pages/services/ServiceEditForm";
import ReviewCreateForm from "./pages/reviews/ReviewCreateForm";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Please adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/likes"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
              />
            )}
          />

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
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/contact/create/"
            render={() => <ContactCreateForm />}
          />
          <Route
            exact
            path="/services"
            render={() => <ServicesPage message="No results found.Adjust the search keyword" />}
          />
          <Route
            exact
            path="/services/create"
            render={() => <ServiceCreateForm />}
          />
          <Route
            exact
            path="/services/:id"
            render={() => <ServicePage />}
          />
          <Route
            exact
            path="/services/:id/edit"
            render={() => <ServiceEditForm />}
          />
          <Route
            exact
            path="/reviews/:id"
            render={() => <ReviewsPage message="No results found.Be the first one to leave a review." />}
          />
          <Route
            exact
            path="/reviews/:id/create"
            render={() => <ReviewCreateForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      <ToastContainer/>
    </div>
  );
}

export default App;
