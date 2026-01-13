
const KeyStrockSounds = [
    new Audio('/sounds/keystroke1.mp3'),
    new Audio('/sounds/keystroke2.mp3'),
    new Audio('/sounds/keystroke3.mp3'),
    new Audio('/sounds/keystroke4.mp3'),
]

function useKeyboardeSound (){
     
       const playRandomKeyStrockSound = () =>{

        const randomSound = KeyStrockSounds[Math.floor(Math.random() * KeyStrockSounds.length)]

        randomSound.currentTime = 0;

        randomSound.play().catch(error => console.log('Audio played error',error))

       }

    return {playRandomKeyStrockSound} 
}



export default useKeyboardeSound;