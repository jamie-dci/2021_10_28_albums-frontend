# Express - Linking a React Frontend with a Node/Express Backend

Now it's time to bring your ability to POST albums into the frontend!

To complete this exercise you should use the server you created during the previous exercise. :-)

### Instructions

1. Create a **simple** React UI. This should consist of a heading (e.g. "Add an Album to the Collection!") and a **React form** with the correct fields ("band", "album title" and "album year"). You will also need a button to submit the form.

2. You should create `state` variables in your React app and make sure that these are in charge of all data coming in. If the user types something into an input, **first** you should update the relevant state variable, and **then** re-render the app so the user can see the change in the input.

**Remember:** The "value" attribute of each input will be relevant here!

3. When you submit the React form (using the `onSubmit` event handler), you should send a `fetch` request using the HTTP "PUT" method. You should create a new "album" object based on the current values of the state variables. You can send the "album" object in the `body` of your request.

**Note:** If you need to, you should revise how to make a "POST" request using `fetch`, as it requires an extra argument compared to a "GET" request...

4. Your server should handle the "POST" request (you should already have the logic for this) and send back a response. You should handle the response as part of your `fetch` request using either Promise syntax or `await async` syntax. When you have processed the response, make sure to log it response in the browser console so you can be sure your request was successful.

5. Finally, you should give the user some feedback when a request is successfully made, for example, by making an `alert()` inviting them to submit another album.

**Bonus**:

6. If (and only if!) you have some extra time, perhaps you could style your React page so that it looks a little better. ;-)