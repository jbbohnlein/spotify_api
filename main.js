// Declarations for our song values
let song;
let playSong;


// Spotify Client Creds
const clientId = "716c9acd36b84859a4eb28efeec1c658";
const clientSecret = "babb7b7105324c17b07b7ecefb309c4c";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',   // writing JSON
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Access the data given to us by the fetch response (Promise)  -- the clue that this is a promise is the async and await
    const data = await result.json();
    return data.access_token
}

// Function to get Song Info when image figure is clicked
/**
 * @param img_index      
 * @param item_index
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Then finds the correct item_index inside of the JSON response data from Spotify
 * which will produce a preview url that will be used to play song from soundtrack.
 */

 async function clickedEvent(img_index, item_index){       // if hover over item_index, I can see the notes we wrote in the above comment
     // Get Track Name 
     let track = document.getElementsByTagName('img')[img_index].attributes[2].value;     
                                                                    // ^ this will be the "alt" in the html img section
     // Get Token
     let token = await _getToken();

     let headers = new Headers([               // these headers are used to get the music from Spotify's api
         ['Content-Type', 'application/json'],
         ['Accept', 'application/json'],
         ['Authorization', `Bearer ${token}`]  // tick marks
     ]);
                                                                    // hard-coding track into url
     let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{   
         method: 'GET',          // ^ 3 items (key-value pairs) being sent in the URL - search (q=query) for track, type is track, limit to 15
         headers: headers
     });

     let result = await fetch(request);  // have to use 'await' because we're waiting on getToken to happen first

     let response = await result.json();  // convert to json

     console.log(response)
     let song = response.tracks.items[item_index].preview_url   // not allowed to play the full song because spotify only gives us the preview


     // TO-DO: Add songSnippet function to play the selected song

    // Before we play a song, first check if playSong is True, if so then stop it
     if (playSong){
         stopSnippet();
     }
     songSnippet(song);
 }


 /**
  * @param id
  * @param event
  * 
  * id = image id for gallery image
  * event = Mouse event given by the action from our user
  * 
  * Function produces songs from the clickedEvent based 
  * on index of image.
  */

  function getSong(id,event){
      switch(id){                          // switch function
          case 'fig1': {                // Tyler Childers - Purgatory
              event.stopPropagation();
              clickedEvent(0,0)
              break;
          }                                                                                 // Brandon's video code for the clicked event has diff. numbers
          case 'fig2': {                // Sturgill Simpson - Keep it Between the Lines
              event.stopPropagation();
              clickedEvent(1,0)
              break;
          }
          case 'fig3': {                // Big Wild, Tove Styrke - Aftergold 
              event.stopPropagation();
              clickedEvent(2,0)
              break;
          }
          case 'fig4': {
              event.stopPropagation();  // Lake Street Dive - Automatic
              clickedEvent(3,0)
              break;
          }
          case 'fig5': {
              event.stopPropagation();  // The Dip - Sure don't Miss You
              clickedEvent(4,0)
              break;
          }
          case 'fig6': {                // JD McPherson - Let the Good times Roll
              event.stopPropagation();
              clickedEvent(5,0)
              break;
          }
      }
  }

//   /**
//    * @param url
//    * 
//    * 
//    * Function will return an audio clip given by the preview url
//    */

   function songSnippet(url){
       playSong = new Audio(url);
       return playSong.play()
   }

   /**
    * NO PARAMS
    * 
    * Function returns event to stop song snippet
    */
   function stopSnippet(){
       return playSong.pause();
   }