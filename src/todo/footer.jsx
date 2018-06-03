import '../assets/styles/footer.styl'
export default {
    data(){
        "use strict";
       return{
           "name":"duixintong"
       }
    },
    render(){
        "use strict";
        return(
            <div id="footer">
                <span>Written by {this.name}</span>
            </div>
        )
    }
}