const url = document.getElementById('videourl');
const submitBtn = document.getElementById('convertBtn');
const InfoContainer = document.getElementById('videoInfo');
const Spinner = document.getElementById('spinner');
const downloadBTN = document.getElementById('downloadBtn');
const BASEURL = 'http://localhost:3000';

submitBtn.addEventListener('click', ()=>{
	if(url.value == '') return;
	downloadBTN.style.display = 'none';
	Spinner.style.display = 'block';
	InfoContainer.innerHTML = "";
	$.ajax({
		type:'GET',
		url:`${BASEURL}/videoInfo?url=${url.value.trim()}`,
		success:function(res){
			 // console.log(res)
			var appendData = `
				<h4 class="videotitle text-center">${res?.title}</h4>
				<p class="category text-center">Category: <b>${res?.category}</b></p>
				<p class="text-center"><b>Video-Preview-Image</b></p>
				<div class="img d-flex justify-content-center">
					<img src="${res?.thumbnails[3].url}" alt="" class="img-fluid " />
				</div>			
			`;
			InfoContainer.innerHTML=appendData;
			Spinner.style.display = 'none';
			downloadBTN.style.display = 'block';
		},
		error:function(error){
			console.log(error)
		}
	})
})

downloadBtn.addEventListener('click', ()=>{
	const videoURL = url.value.trim();
	if(!videoURL) return;
	window.location.assign(`${BASEURL}/download?videoURL=${videoURL}`);
})