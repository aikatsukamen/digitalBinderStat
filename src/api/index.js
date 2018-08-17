import fetchJsonp from 'fetch-jsonp';
import cheerio from 'cheerio';

function getBinder(url) {
  console.log(`[バインダー情報取得]${url}`);
  return new Promise((resolve, reject) => {
    fetchJsonp('https://script.google.com/macros/s/AKfycbyGqtJYxOIgvFgYW-xZRW4ZGQAfwPunJGzm6WwiCetbI56CGJWh/exec?url=' + url, {
      jsonpCallback: 'callback',
      timeout: 10000
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        const ret = analyzeFriendsDigitalBinder(json.htmlStr);
        resolve({ data: ret });
      })
      .catch(error => {
        console.log(error);
        resolve({ error });
      });
  });
}

/**
 * デジタルバインダーのデータをスクレイピングする
 * @param {string} htmlStr
 * @return {object} スクレイピング結果
 */
function analyzeFriendsDigitalBinder(htmlStr) {
  if (htmlStr.match('データが見つかりません') !== null) throw { message: 'データが見つかりません' };

  const $ = cheerio.load(htmlStr);

  const statInfo = {
    version: {
      id: '',
      name: ''
    },
    count: {
      all: {
        type: {
          qt: 0,
          co: 0,
          se: 0,
          po: 0
        },
        category: {
          t: 0,
          b: 0,
          s: 0,
          a: 0,
          w: 0
        },
        rarity: {
          n: 0,
          r: 0,
          pr: 0,
          cr: 0,
          fr: 0,
          bfr: 0
        }
      },
      collect: {
        type: {
          qt: 0,
          co: 0,
          se: 0,
          po: 0
        },
        category: {
          t: 0,
          b: 0,
          s: 0,
          a: 0,
          w: 0
        },
        rarity: {
          n: 0,
          r: 0,
          pr: 0,
          cr: 0,
          fr: 0,
          bfr: 0
        }
      },
      rate: {
        type: {
          qt: 0,
          co: 0,
          se: 0,
          po: 0
        },
        category: {
          t: 0,
          b: 0,
          s: 0,
          a: 0,
          w: 0
        },
        rarity: {
          n: 0,
          r: 0,
          pr: 0,
          cr: 0,
          fr: 0,
          bfr: 0
        }
      }
    },
    list: {
      all: [],
      possession: [],
      notPos: []
    }
  };

  statInfo.username = $('.m_login-name')
    .find('span')
    .text();

  statInfo.version.id = $('.m_select > select option:selected').val();
  statInfo.version.name = $('.m_select > select option:selected').text();

  $('.m_dress > .m_dress_card').each((index, elem) => {
    /** ドレスID */
    const dressId = $(elem)
      .find('a')
      .attr('onclick')
      .match(/detail\/(.*?)\//)[1];
    // console.log(dressId);

    /** レアリティ込みのカードID */
    const cardIdOrig = $(elem)
      .find('.m_dress_card_name')
      .text()
      .trim();
    /** カードID */
    // const cardId = cardIdOrig.split(/\s/)[0];
    /** レアリティ */
    // const rarity = cardIdOrig.split(/\s/)[1].toLowerCase();
    const rarity = (() => {
      switch (true) {
      case /_U_PR_/.test(dressId):
        return 'bfr';
      case /_U_R_/.test(dressId):
        return 'fr';
      case /_PR_/.test(dressId):
        return 'pr';
      case /_R_/.test(dressId):
        return 'r';
      case /_N_/.test(dressId):
        return 'n';
      case /_U_CR_/.test(dressId):
        return 'cr';
      }
    })();

    /** 属性 */
    const type = (() => {
      switch (true) {
      case /_Qt_/.test(dressId):
        return 'qt';
      case /_Co_/.test(dressId):
        return 'co';
      case /_Se_/.test(dressId):
        return 'se';
      case /_Po_/.test(dressId):
        return 'po';
      }
    })();
    /** 部位 */
    const category = (() => {
      switch (true) {
      case /_T\d/.test(dressId):
        return 't';
      case /_B\d/.test(dressId):
        return 'b';
      case /_S\d/.test(dressId):
        return 's';
      case /_A\d/.test(dressId):
        return 'a';
      case /_W\d/.test(dressId):
        // 今のところ通常弾にトップ＆ボトムスが無いので不明
        return 'w';
      }
    })();

    /** 所持フラグ */
    const doesPossess = $(elem).find('.is_none')[0] ? false : true;

    // 統計に加算する
    statInfo.count.all.rarity[rarity] += 1;
    statInfo.count.all.type[type] += 1;
    statInfo.count.all.category[category] += 1;
    statInfo.list.all.push(cardIdOrig);
    if (doesPossess) {
      statInfo.count.collect.rarity[rarity] += 1;
      statInfo.count.collect.type[type] += 1;
      statInfo.count.collect.category[category] += 1;
      statInfo.list.possession.push(cardIdOrig);
    } else {
      statInfo.list.notPos.push(cardIdOrig);
    }
  });
  // 所持率を計算する(小数点以下切り捨ての整数値))
  // 属性
  for (let t of ['qt', 'co', 'se', 'po']) {
    statInfo.count.rate.type[t] = Math.trunc((100 * statInfo.count.collect.type[t]) / statInfo.count.all.type[t]);
    statInfo.count.rate.type[t] = isNaN(statInfo.count.rate.type[t]) ? 0 : statInfo.count.rate.type[t];
  }
  // レアリティ
  for (let r of ['bfr', 'fr', 'pr', 'r', 'n', 'cr']) {
    statInfo.count.rate.rarity[r] = Math.trunc((100 * statInfo.count.collect.rarity[r]) / statInfo.count.all.rarity[r]);
    statInfo.count.rate.rarity[r] = isNaN(statInfo.count.rate.rarity[r]) ? 0 : statInfo.count.rate.rarity[r];
  }
  // 部位
  for (let c of ['t', 'b', 's', 'a', 'w']) {
    statInfo.count.rate.category[c] = Math.trunc((100 * statInfo.count.collect.category[c]) / statInfo.count.all.category[c]);
    statInfo.count.rate.category[c] = isNaN(statInfo.count.rate.category[c]) ? 0 : statInfo.count.rate.category[c];
  }
  // console.log(statInfo);
  return statInfo;
}

export default { getBinder, analyzeFriendsDigitalBinder };