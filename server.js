import express from 'express';
import * as cheerio from 'cheerio';

import cors from 'cors';

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get(
  '/api/video/tv/:series_id/:season_number/:episode_number',
  async (req, res) => {
    const { series_id, season_number, episode_number } = req.params;
    console.log(series_id, season_number, episode_number);

    try {
      const response = await fetch(
        `https://vidsrc.xyz/embed/tv/${series_id}/${season_number}-${episode_number}`,
        {
          method: 'GET',
        }
      );
      const doc = await response.text();
      const $ = cheerio.load(doc);
      const iframe = $('iframe').first().prop('outerHTML');
      if (iframe) {
        res.send(`
              ${iframe}
     `);
      } else {
        res.status(404).json({ error: 'Iframe not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
);

// app.get("/api/video/movie/:movie_id", async (req, res) => {
//   const { movie_id } = req.params;
//   console.log(movie_id);
//   try {
//     const response = await fetch(`https://vidsrc.xyz/embed/movie/${movie_id}`, {
//       method: "GET",
//     });
//     const doc = await response.text();
//     const $ = cheerio.load(doc);
//     const iframe = $("iframe").first().prop("outerHTML");
//     const servers = $('.servers').html()
//     console.log(servers);

//     if (iframe) {
//       res.send(`<!DOCTYPE html>
//             <html>
//             <head>
//             <title>Movie</title>
//             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="" crossorigin="anonymous"/>
// <link rel="stylesheet" href="/style.css?t=1710289820"/>

//             <style>
//                 body {
//                     margin: 0;
//                     padding: 0;
//                     display: flex;
//                     height: 100vh;
//                     width: 100vw;
//                     justify-content: center;
//                     align-items: center;
//                     height: 100vh;
//                     background-color: #000;
//                 }
//                 iframe {
//                     border: none;
//                     width: 100%;
//                     height: 100%;
//                 }
//             </style>
//         </head>
//         <body>
//             ${iframe}
//             <div class="servers" style="display: none;" >
//             ${servers}
//         </div>
//             <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
// <script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.16.0/js/md5.min.js" integrity="" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/3.0.5/js.cookie.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js" integrity="sha512-3j3VU6WC5rPQB4Ld1jnLV7Kd5xr+cq9avvhwqzbH/taCRNURoeEpoPBK9pDyeukwSxwRPJ8fDgvYXd6SkaZ2TA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

// <script>
//  $(document).ready(function(){
//         console.log("ready");
//         $(".servers").show();

//         if(window.frameElement === null){
//             $("#top_buttons_parent").show();
//         }else{
//             var ref = window.frameElement.getAttribute('data-ref');
//             if(ref != null){
//                 $(".servers").css("left","100px")

//                 if(ref.length > 3){
//                     $.get("/is_vip_str.php?ref="+encodeURIComponent(ref), function(data, status){
//                         if(data == "1"){
//                             $("#top_buttons_parent").hide();
//                         }else{
//                             $("#top_buttons_parent").show();
//                         }
//                     });
//                 }else{
//                     $("#top_buttons_parent").show();
//                 }
//             }else{
//                 $("#top_buttons_parent").show();
//             }
//         }
//     });

//     $(document).ready(function() {
//     $(".button_content #content").on('click', '.close', function(){
//         $(this).parent().parent().fadeOut("fast");
//     });
//     $("#sources #list .source").click(function() {
//         $("#the_frame").removeAttr("style");

//         if ($(this).find("#name").html() != "VidSrc PRO") {
//             $("#top_buttons #cc").addClass("button_inactive");
//         } else {
//             $("#top_buttons #cc").removeClass("button_inactive");
//         }

//         $("#the_frame").html("");
//         $('<iframe>', {
//             src: "//edgedeliverynetwork.com/rcp/" + $(this).data("hash"),
//             frameborder: 0,
//             scrolling: 'no',
//             allowfullscreen: 'yes',
//             height: '100%',
//             width: '100%'
//         }).appendTo('#the_frame');
//         $("#sources #list .active_source").removeClass("active_source");
//         $(this).addClass("active_source");
//         $("#sources").hide();
//         $("#player_iframe").on("load", function () {
//             $("#the_frame").attr("style","background-image: none;");
//         });
//     });

//     $(".servers .serversList .server").click(function() {
//         $("#the_frame").html("");
//         $('<iframe>', {
//             src: "//edgedeliverynetwork.com/rcp/" + $(this).data("hash"),
//             frameborder: 0,
//             scrolling: 'no',
//             allowfullscreen: 'yes',
//             height: '100%',
//             width: '100%'
//         }).appendTo('#the_frame');
//         $(".servers .serversList").hide();
//         $("#player_iframe").on("load", function () {
//             $("#the_frame").attr("style","background-image: none;");
//         });
//     });

//     $(".servers .serversToggle").click(function() {
//         $(".servers .serversList").toggle();
//     });

//     $("#top_buttons #source").click(function() {
//         $("#sources").fadeIn("fast");
//     });
//     $("#top_buttons #cc").click(function() {
//         $("#subtitles").fadeIn("fast");
//     });
// });
// $(document).mouseup(function(e) {
//     if ($('.button_content #content').is(':visible')) {
//         var container = $(".button_content #content");
//         if (!container.is(e.target) && container.has(e.target).length === 0) {
//             $(".button_content").fadeOut("fast");
//         }
//     }
// });
//     </script>
//         </body>
//         </html>`);
//     } else {
//       res.status(404).json({ error: "Iframe not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

app.get('/api/video/movie/:movie_id', async (req, res) => {
  const { movie_id } = req.params;
  console.log(movie_id);

  let doc;
  try {
    try {
      const response = await fetch(
        `https://vidsrc.xyz/embed/movie/${movie_id}`,
        {
          method: 'GET',
        }
      );
      doc = await response.text();
    } catch (err) {
      console.log(err);
      res.json({ error: 'Something went wrong' });
    }

    const $ = cheerio.load(doc);
    $('script').remove();
    const $iframe = $('iframe').first();

    // Remove all inline event attributes (like onclick, onload, etc.)
    $iframe.get(0).attribs = Object.fromEntries(
      Object.entries($iframe.get(0).attribs).filter(
        ([key]) => !key.startsWith('on')
      )
    );

    const iframe = $.html($iframe);

    if (iframe) {
      res.send(`
            ${iframe}   
`);
    } else {
      res.status(404).json({ error: 'Iframe not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// app.get("/api/video/movie/:movie_id", async (req, res) => {
//   const { movie_id } = req.params;
//   try {
//     // First get the page with the iframe
//     const response = await fetch(`https://vidsrc.xyz/embed/movie/${movie_id}`);
//     const doc = await response.text();
//     const $ = cheerio.load(doc);

//     // Extract the iframe src URL
//     const iframeSrc = $("iframe").first().attr("src");

//     if (iframeSrc) {
//       // Send a page that directly embeds this src, not the original iframe
//       res.send(`<!DOCTYPE html>
//         <html>
//         <head>
//             <title>Movie</title>
//             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//             <style>
//                 body {
//                     margin: 0;
//                     padding: 0;
//                     display: flex;
//                     height: 100vh;
//                     width: 100vw;
//                     justify-content: center;
//                     align-items: center;
//                     background-color: #000;
//                 }
//                 iframe {
//                     border: none;
//                     width: 100%;
//                     height: 100%;
//                 }
//             </style>
//         </head>
//         <body>
//             <iframe src="${iframeSrc}"
//  frameborder="0" scrolling="no" allowfullscreen="yes"></iframe>
//         </body>
//         </html>`);
//     } else {
//       res.status(404).json({ error: "Iframe source not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
