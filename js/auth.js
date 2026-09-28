function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function setError(id,msg){const e=document.getElementById(id); if(e)e.textContent=msg;}
function clearErrors(ids){ids.forEach(id=>setError(id,""));}

const registerForm=document.getElementById("registerForm");
if(registerForm) registerForm.addEventListener("submit",e=>{
  e.preventDefault(); clearErrors(["regNameError","regEmailError","regPasswordError","regConfirmError"]);
  const name=document.getElementById("regName").value.trim(), email=document.getElementById("regEmail").value.trim(), pass=document.getElementById("regPassword").value, confirm=document.getElementById("regConfirm").value, terms=document.getElementById("terms").checked;
  let ok=true;
  if(name.length<2){setError("regNameError","Enter your full name.");ok=false;}
  if(!validEmail(email)){setError("regEmailError","Enter a valid email address.");ok=false;}
  if(pass.length<6){setError("regPasswordError","Password must contain at least 6 characters.");ok=false;}
  if(pass!==confirm){setError("regConfirmError","Passwords do not match.");ok=false;}
  if(!terms){alert("Please accept the demo terms.");ok=false;}
  if(!ok)return;
  localStorage.setItem("autotechUser",JSON.stringify({name,email,password:pass}));
  document.getElementById("registerSuccess").textContent="✓ Account created. Redirecting to login...";
  setTimeout(()=>location.href="login.html",900);
});

const loginForm=document.getElementById("loginForm");
if(loginForm) loginForm.addEventListener("submit",e=>{
  e.preventDefault(); clearErrors(["loginEmailError","loginPasswordError"]);
  const email=document.getElementById("loginEmail").value.trim(), pass=document.getElementById("loginPassword").value, user=JSON.parse(localStorage.getItem("autotechUser")||"null");
  let ok=true;
  if(!validEmail(email)){setError("loginEmailError","Enter a valid email.");ok=false;}
  if(pass.length<6){setError("loginPasswordError","Password must contain at least 6 characters.");ok=false;}
  if(!ok)return;
  if(!user || user.email!==email || user.password!==pass){setError("loginPasswordError","Email or password does not match the demo account.");return;}
  localStorage.setItem("autotechLoggedIn","true");
  document.getElementById("loginSuccess").textContent="✓ Login successful. Opening homepage...";
  setTimeout(()=>location.href="index.html",800);
});

const contactForm=document.getElementById("contactForm");
if(contactForm) contactForm.addEventListener("submit",e=>{
  e.preventDefault();
  clearErrors(["contactNameError","contactEmailError","contactMessageError"]);
  const n=document.getElementById("contactName").value.trim(), em=document.getElementById("contactEmail").value.trim(), m=document.getElementById("contactMessage").value.trim();
  let ok=true;
  if(n.length<2){setError("contactNameError","Please enter your name.");ok=false;}
  if(!validEmail(em)){setError("contactEmailError","Please enter a valid email.");ok=false;}
  if(m.length<10){setError("contactMessageError","Message should contain at least 10 characters.");ok=false;}
  if(ok){document.getElementById("contactSuccess").textContent="✓ Message validated successfully. (Frontend demo — not sent to a server.)";contactForm.reset();}
});
