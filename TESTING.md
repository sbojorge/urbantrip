# Functional testing

## Delete a post (image or video):
Goal:<br>
Ensure a user can delete any of his/her posts.

Description:<br>
For this test the logged in user is "admin_2".<br>
The user has navigated to his/her profile page.<br>
There 2 posts:

![profile](/testing/images/delete/picture_1.png)

Post 39, which is a video post, will be deleted.

Steps:<br>
1. Click on the post to delete.<br>
The 3 dots menu appears next to the post's last update date and the url displays the post's id number:

![post_39](/testing/images/delete/picture_2.png)

2. Click on the 3 dots menu and then click on delete (trash icon).<br>

Expected:<br>
After deleting any of his/her posts, the user should be redirected to the last visited page.

Actual:<br>
The post has been deleted and the user is redirected to the last visited page, in this case, the his/her profile page.<br>
This user has only 1 post now:

![1post](/testing/images/delete/picture_3.png)

---


