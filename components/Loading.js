import {DoubleBounce} from 'better-react-spinkit';


function Loading() {
    const containerStyle={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"100vh",
        justifyContent:"center",
        backgroundColor:"#FFF",
    }
    const ImageStyle = {
        height:"150px",
        width:"150px",
        marginBottom:"20px"
    }

    return (
       
            
            <div style={containerStyle}>
                <img style={ImageStyle} src= "https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
                <DoubleBounce  color="#31b021" size={50}/>
            </div>

       
    )
}

export default Loading;





