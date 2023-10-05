//MMORPG for YungPunks-2069

To run local server:\
npm install\
npm run dev\
http://localhost:3000
\
To buidl:\
NODE_ENV=production npm run build\
dont forget to include JSON files\
\
dist = files in production\
main = files in development\
node_modules = lmeow  

main  
 events  
 spritesheets
 worlds
  world .world
  maps structure  (/main/maps/world/)  
   Map  .tmx  
  ->  Tileset .tsx  
  ->  Tileset .png  
  ->  Props .tsx  
  ->  Props .png  
