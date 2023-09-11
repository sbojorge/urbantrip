# Functional testing
I performed a series of test per component. A review of the tests is available below:

![manual-t1](/testing/images/reports/picture_1.png)
![manual-t1](/testing/images/reports/picture_2.png)
![manual-t1](/testing/images/reports/picture_3.png)
![manual-t1](/testing/images/reports/picture_4.png)
![manual-t1](/testing/images/reports/picture_5.png)

This is a selection of the performed manual testing and the followed steps:<br>
## Create a video post
Goal:<br>
Ensure a user can create a video post.

Description:<br>
For this test the logged in user is "admin_2".<br>

Steps:<br>
1. Click on the "Create" link on the navbar.
2. On the posts/create page, click on "Create a post using a video".
3. On the posts/create/video page, click on "Choose file" in order to upload the video.
4. Fill in the title(optional) and description fields.
5. Click the "create" button.

Expected:<br>
The video should be uploaded and the user should be redirected to the post/id page.

Actual:<br>
The video has been uploaded and the user is redirected to the post/id page:

![video](/testing/images/create/picture_1.png)

## Delete a post (image or video):
Goal:<br>
Ensure a user can delete any of his/her posts.

Description:<br>
For this test the logged in user is "admin_2".<br>
The user has navigated to his/her profile page.<br>
There 2 posts:

![profile](/testing/images/delete/picture_1.png)

Post 44, which is a video post, will be deleted.

Steps:<br>
1. Click on the post to delete.<br>
The 3 dots menu appears next to the post's last update date and the url displays the post's id number:

![post_39](/testing/images/delete/picture_2.png)

2. Click on the 3 dots menu and then click on delete (trash icon).<br>

Expected:<br>
After deleting any of his/her posts, the user should be redirected to the homepage.

Actual:<br>
The post has been deleted and the user is redirected to the homepage.<br>
This user has only 1 post now:

![1post](/testing/images/delete/picture_3.png)

---

## Reports
### Lighthouse

![lighthouse](/testing/images/reports/picture_6.png)

The reasons for the slow performance value are listed here:

![performance](/testing/images/reports/picture_6A.png)

The application could be faster with lighter images.


