const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")
const encodeUrl = require('encodeurl');

const dafontSearch = async (query) => {
   const base = `https://www.dafont.com`
      const res = await axios.get(`${base}/search.php?q=${query}`)
      const $ = cheerio.load(res.data)
      const hasil = []
         const total = $('div.dffont2').text().replace(` fonts on DaFont for ${query}`, '') 
      $('div').find('div.container > div > div.preview').each(function(a, b) {
      $('div').find('div.container > div > div.lv1left.dfbg').each(function(c, d) { 
      $('div').find('div.container > div > div.lv1right.dfbg').each(function(e, f) { 
        let link = `${base}/` + $(b).find('a').attr('href')
       let titulo = $(d).text() 
       let estilo = $(f).text() 
         hasil.push({
             fonte: titulo, 
             style: estilo, 
             total: total,
             linkFonte: link 
           }) 
      }) 
   }) 
}) 
return hasil
}

const horoshoje = (signo) => {
return new Promise((resolve, reject) => { 
        axios(`https://www.somostodosum.com.br/horoscopo/signo/${signo}.html`)
        .then(async ({data}) => {
            var $ = cheerio.load(data)
            var profissional = $('.all-browsers > br')[0].prev.data
            var pessoal = $('.all-browsers > br')[2].prev.data
            var saude = $('.all-browsers > br')[4].prev.data
            var total = profissional+'\n'+pessoal+'\n'+saude
            var horosdata = $('center > h2').text()
            var thumb = $('center > img')[0].attribs.src
            var fail = {body: 'Falha!'}
            if(!profissional) reject(fail)
            if(!pessoal) reject(fail)
            if(!saude) reject(fail)
            if(!total) reject(fail)
            if(!horosdata) reject(fail)
            if(!thumb) reject(fail)
            var json = {
                imagem: 'https://www.somostodosum.com.br/horoscopo' + thumb.slice(2),
                título: horosdata,
                inform: total
            }
            resolve(json)
        })
    })
}

function xvideosPorno(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://xvideosporno.blog.br/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.postbox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var duração = $(say).find("time.duration-top").text().trim();
    var qualidade = $(say).find("b.hd-top").text().trim();
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

function wattpad(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.wattpad.com/search/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('div.story-card-data.hidden-xxs > div.story-info ').each(function(a, b) {
                    $('ul.list-group > li.list-group-item').each(function(c,d) {
                    result = {
                    titulo: $(b).find('> div.title').text(),
                    link:'https://www.wattpad.com' + $(d).find('a').attr('href'),
                    imagem: $(d).find('img').attr('src'),
                    description: $(b).find('> div.description').text().replace(/\n/g,'')
                }
                hasil.push(result)
                })
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function igstalk(username){
	return new Promise((resolve,reject) => {
		axios.get('https://www.instagram.com/'+ username +'/?__a=1',{
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
				"cookie": "mid=XBXl1AALAAEbFoAEfNjZlMMG9dwX; ig_did=91E66A48-5AA2-445D-BFE6-84DC4456DE8F; fbm_124024574287414=base_domain=.instagram.com; ig_nrcb=1; shbid=\"12737\0544008624962\0541656157971:01f72a5102dc07af6845adf923ca70eb86e81ab95fa9dbfdaf157c9eef0e82fd1f10fe23\"; shbts=\"1624621971\0544008624962\0541656157971:01f74841fba8e77a0066b47ea891dec8fba6fdf9216c0816f9fb3532292f769828800ae2\"; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; csrftoken=PpiPMEl0R2pAwThsw4NXynO6cVIXHZDo; ds_user_id=38316792800; sessionid=38316792800:rQj5Tr3g5zkg7b:4; rur=\"RVA\05438316792800\0541656158332:01f759cf624bef147397144805bb4c26f6c8b36a232e0f5738c570ee492f6b629f84f6e5\""
			}
		})
		.then(({ data }) => {
			const user = data.graphql.user
			let result = {
				message: 'ZeeoneOfc',
                id: user.id,
                biography: user.biography,
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                fullName: user.full_name,
                highlightCount: user.highlight_reel_count,
                isBusinessAccount: user.is_business_account,
                isRecentUser: user.is_joined_recently,
                accountCategory: user.business_category_name,
                linkedFacebookPage: user.connected_fb_page,
                isPrivate: user.is_private,
                isVerified: user.is_verified,
                profilePicHD: user.profile_pic_url_hd,
                username: user.username,
                postsCount: user.edge_owner_to_timeline_media.count
			}
		resolve(result)
		})
	.catch(reject)
	})
}

function pornhubsrc(q) {
return new Promise((resolve, reject) => {
axios.get(`https://pt.pornhub.com/video/search?search=${q}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("li.pcVideoListItem.js-pop.videoblock.videoBox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var duração = $(say).find("var.duration").text().trim();
    var qualidade = $(say).find("span.hd-thumbnail").text().trim();
    var autor = $(say).find("div.usernameWrap").text().trim();    
    var visualizações = $(say).find("span.views").text().trim();    
    var data_upload = $(say).find("var.added").text().trim();        
    var hype = $(say).find("div.value").text().trim();    
    var link2 = `https://pt.pornhub.com/${link}`
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      autor: autor,
      visualizações: visualizações,
      data_upload: data_upload,
      hype: hype,
      link: link2
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

async function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            resolve(hasil)
        })
    })
}

async function topFlix(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://topflix.one/list/filmes/${query}/`)
    .then( ({data}) => {
      const $ = cheerio.load(data)
      const dados = []
      $('div[class="movie-item-style-1"]').each( function (i, e) {
        dados.push({
          nome: $(e).find('h6 > a').text(),
          imagem: $(e).find('img').attr('data-src'),
          link: 'https://topflix.one'+$(e).find('h6 > a').attr('href')
        })
      })
      resolve({status: 200, criador: '+55 94 9147-2796', resultado: dados})
    })
    .catch(e => {
      reject(e)
    });
  });
}

async function ultimasNoticias() {
 return new Promise((resolve, reject) => {
   axios.get(`https://news.google.com/topstories?hl=pt-BR&gl=BR&ceid=BR:pt-419`).then(async ({data}) => {
    const $ = cheerio.load(data)
    const dados = []
    const dados2 = []
    $('h4[class="ipQwMb ekueJc RD0gLb"]').each((i, e) => {
     dados.push({
       titulo: $(e).find('a').text(),
        link: 'https://news.google.com' + $(e).find('a').attr('href').slice(1)
     })
   })
   for(i=0; i < dados.length; i++) {
     const aXio = await axios.get(dados[i].link)
     const $$ = cheerio.load(aXio.data)
     dados2.push({
       titulo: dados[i].titulo,
       link: $$('div[class="m2L3rb eLNT1d"]').find('a').attr('href')
     })
   }
   resolve({status: 200, autor: '+55 94 9147-2796', resultado: dados2})
  })
   .catch(e => {
     reject(e)
   })
 })
}

async function mercadoLivreSearch(q) {
  return new Promise((resolve, reject) => {
    axios.get(`https://lista.mercadolivre.com.br/${encodeUrl(q.replace(/[À-ü]/g, '').trim())}`, {
    headers: {
       "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
      }
    })
    .then((res) => {
      const $ = cheerio.load(res.data);
      const dados = [];
      $('div[class="andes-card andes-card--flat andes-card--default andes-card--padding-default"]').each((i, e) => {
        json = {
          produto: $(e).find('h2:first').text(),
          id: $(e).find('input[name="itemId"]').attr('value'),
          imagem: $(e).find('img:first').attr('data-src') || $(e).find('img:first').attr('src'),
          preco: 'R$ '+ $(e).find('.price-tag-fraction:first').text(),
          link: $(e).find('a:first').attr('href')
        }
        if(json.preco && json.imagem && json.link) dados.push(json);
      });
      resolve({status: res.status, criador: '🔥 +55 94 9147-2796 🔥', resultado: dados})
    })
    .catch(e => {
      reject(e)
    });
  });
}

async function hentaiimg(title) {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random * 10)
        axios.get(`https://rule34.world/${title}/page/${page}`)
        .then((res) => {
            const $ = cheerio.load(res.data)
            const hasil = []
            $('app-post-grid > app-grid > app-loading-block > div > div.box-grid.ng-star-inserted > app-post-preview').each(function (a, b) {
                hasil.push('https://rule34.world'+$(b).find('img').attr('src'))
            })
            resolve({ 
            status: res.status, 
            admin: 'wa.me/5582988279194', 
            resultado: hasil })
        })
    })
}

const linkfy = require('linkifyjs');

async function amazonSearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.amazon.com.br/s?k=${encodeUrl(query)}&ref=nb_sb_noss`, {
      headers: {
        "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
      }
    })
    .then((res) => {
      const dados = [];
      const $ = cheerio.load(res.data)
      $('div[data-component-type="s-search-result"]').each((i, e) => {
        dados.push({
          titulo: $(e).find('span[class="a-size-small a-color-base a-text-normal"]').text(),
          preco: $(e).find('span[class="a-offscreen"]:first').text(),
          imagem: $(e).find('img.s-image').attr('srcset') ? (linkfy.find($(e).find('img.s-image').attr('srcset'))?.pop()?.href || $(e).find('img.s-image').attr('src')) : $(e).find('img.s-image').attr('src'),
          link: 'https://www.amazon.com.br' + $(e).find('a:first').attr('href')
        });
      });
      resolve({status: res.status, autor: '+55 94 9147-2796', resultado: dados})
    })
    .catch(e => {
      reject(e)
    });
  });
}

async function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

module.exports = { dafontSearch, horoshoje, xvideosPorno, wattpad, igstalk, twitter, pornhubsrc, hentai, topFlix, ultimasNoticias, mercadoLivreSearch, hentaiimg, amazonSearch}