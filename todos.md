##List of things still need to be done


Todos:

- signup should be half complete when you get to it
- data structure of a user needs to include references to who they've been matched up with
- Pairing : take in input from both sides as to whether they want to be connected
- Service: Do a scan on all the users who matched and then reference whether or not they need to be connected.
Connect their linkedin profiles. Make sure to pass in a reference that they were paired so they dont' get repaired
- Styling: Clean it up and make the profiles look good.

Different "pages"

0 Landing Page: See the profile of Michael the hardcoded user. 
  Either Click Routes you to Signup Page.
  An invite Link?? (TODO)
1 Signup Page (Auth with Linkedin), fill in tags data regardless.
1 a) Signup Part 2. Tiered Signup
2 your match page / no matches today / you matched
3 Profile Page (modify your info)
4 Matched Page. Everyone you've matched with. Down the page in rows.


Current Todos:
<!-- Fetch a user who is not yourself, display them on the screen next to yourself, and then log an action from you to them, then log that you guys have "matched".

Update a users 'match potentials' based during user creation one time/ -->

<!-- Dispatch an action that updates that array with 3 fields - active,  -->

<!-- Check for whether or not the other person also liked u. If they did, then display a match. if they didn't, then say. Ok check back in x amount of time. -->

<!-- Set up the user creation data to account for 'the tags'. It's in the profile data, and you can add or remove them properly. -->

<!-- Set up authorization with linkedin integration -->

<!-- //Allow user to create a account w/ Linkedin. Add additional data afterwards
If User is already defined, then need to be able to
(such as required data) -->

<!-- //Allow user to log back in using linkedin. -->
<!-- Allow user to do two step process to create an account. First, create a name, email, and password. 

<!-- Allow user to do two step process to create an account. First, create a name, email, and password.  -->
<!--
Then, add a photo, tags, and bio. (If they leave, then force them back to this page as long as they didn't finish.) -->

<!-- -- Photo needs to be able to upload something for them (auto saves or updates) -->
<!-- -- Add a a submit button that sends all the updated info to Firebase but not the image it's already done. -->
<!-- -- tags needs to be added, and then you hit save -->

<!-- -- Bio... 1 line -->
<!-- -- After profile completion is filled out and saved profile, redirect to match page.  -->
<!-- --- Add a field for linkedin profile (Must be public url) -->


<!-- -- MATCH Page/ Here is where you view the people that you've matched with.
-- Note: I tracked down the thought about the Yes or NO. I was influenced by Tinder and dating apps.
-- I got here because I didnt want to make someone have to write messages back and forth.
 Realistically I didn't need to ask you at all if you wanted to be matched, I did that work for you upfront. -->
 
<!-- -- Bio... 1 line -->
<!-- -- After profile completion is filled out and saved profile, redirect to match page.  -->

-- Remove the yes/no functionality and the update logic.
-- You can't run "the match function" every time
-- Each "retrieved match" lasts for 3 days. 
-- Need to write a firebase chron job for that.
-- Low key I can also update this myself using a button in my UI under "admin" (lol)
-- Each match updates both pairs so that they won't see each other again.... but what if you miss a match? I guess that's fine, that's part of the fun?
-- Optional Feature: Each person that you end up choosing will give you some kind of bonus points.


-- Add in functionality to change saved photo, or modify your profile info. 

-- Display that... with the linkedin integration icon.


-- Tags should be capped at 3 max. Including the hardcoded one that you were added to. 

