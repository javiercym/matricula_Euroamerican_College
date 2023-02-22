function ingresar(){
    var usuario ="admin";
    var contraseña ="admin";
   
   
    if(document.form.pass.value == contraseña && document.form.user.value ==usuario){
       console.log("contraseña correcta");
   
       localStorage.setItem("usuario",usuario);
       window.location="pages/home.html";
    }else {alert("contraseña incorrecta")}
   
   }