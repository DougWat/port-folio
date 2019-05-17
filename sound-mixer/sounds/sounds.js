import {formatFileName,toTitleCase} from '../Helpers';

const sounds =
{
  ambience:{
    nature:{
      sounds:[
        {
          name: "coastal.wav",
          loop: true
        },
        {
          name: "forest_crickets.wav",
          loop: true
        },
        {
          name: "jungle.wav",
          loop: true
        },
        {
          name: "swamp.wav",
          loop: true
        }
      ],
      insects:{
        crickets:{
          sounds:[
            {
              name: "coastal.wav",
              loop: true
            }
          ]
        }
      }
    }
  },
  effects:{
    technology:{
      computers:{
        sounds:[
          {
            name: "computer_01",
            loop: false
          }
        ]
      },
      cars:{
        sounds:[
          {
            name: "car_rev",
            loop: false
          }
        ]
      }
    }
  }
}

// {
//   heads:[ambience],
//   tree:{
//     ambience/:{
//       name: ambience,
//       children: [ambience/nature],
//       parent: null
//     }
//     ambience/nature/:{
//       name: nature,
//       children: [],
//       parent: ambience,
//       sounds: [
//         ambience/nature/coastal.wav,
//         ambience/nature/forest_crickets.wav
//       ]
//     }
//     ambience/nature/coastal.wav:{
//       name: "Coastal",
//       path: ambience/nature/coastal.wav,
//       loop: true
//     }
//   }
// }

export default function(){
  let soundFiles = [];
  return traverseNew(sounds);
  //return traverseNewsounds);
}

function traverseNew(object, path = ""){
  let returnObj = {};
  let head = [];
  let children = [];
  for(let key in object){
    const keyValue = object[key];
    if(keyValue === null || typeof keyValue === 'undefined'){return;}

    const modPath = path + key + '/';
    let obj = {};

    if(path === ""){
      head.push(modPath);
    }

    if(key !== "sounds"){
      children.push(modPath);
    }

    if(typeof keyValue === 'object' && key !== "sounds"){
      obj = {[modPath]:{}};
      obj[modPath].parent = path === "" ? null : path;
      obj[modPath].name = toTitleCase(key);
      let childObjs = traverseNew(keyValue,modPath);
      obj[modPath].children = childObjs.children;
      returnObj = Object.assign(returnObj, childObjs.tree);
      if(typeof object[key].sounds !== 'undefined'){
        obj[modPath].sounds = childObjs.tree[modPath].sounds;
      }
    }

    if(key === "sounds"){
      obj = {[path]:{}}
      obj[path].sounds = [];
      let soundObjs = formatSoundsNew(keyValue,path)

      for(let soundKey in soundObjs){
        obj[path].sounds.push(soundKey);
      }

      returnObj = Object.assign(returnObj,soundObjs);
    }

    returnObj = Object.assign(returnObj,obj);
  }

  if(path === ""){
    return {tree:returnObj, head: head};
  }
  return {tree: returnObj, children: children}
}

function formatSoundsNew(arr, path){
  let formattedObj = {};

  arr.forEach((sound)=>{
    let formattedPath = path + sound.name;
    sound.name = formatFileName(sound.name);
    sound.path = formattedPath;
    sound.parent = path;
    formattedObj[formattedPath] = sound;
  });
  return formattedObj;
}

function traverse(object, path = ""){
  let soundArray = [];
  for(let key in object){
    console.log(key);
    const keyValue = object[key];
    if(keyValue === null || typeof keyValue === 'undefined'){return;}
    let formattedSounds = [];
    if(key === "sounds"){
      formattedSounds = formatSounds(keyValue, path);
    }
    else if(typeof object[key] === 'object'){
      const modPath = path + key + '/';
      formattedSounds = traverse(keyValue,modPath);
    }
    soundArray = soundArray.concat(formattedSounds);
  }
  return soundArray;
}

function formatSounds(arr, path){
  let formattedArr = [];
  arr.forEach((sound)=>{
    let formattedPath = path + sound.name;
    sound.name = formatFileName(sound.name);
    formattedArr.push(Object.assign({path:formattedPath}, sound));
  });
  return formattedArr;
}
