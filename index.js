/**
 * @desc 判断两个数组是否相等
 * @param {Array} array1
 * @param {Array} array2
 * @return {Boolean}
 */
const arrayEqual = (arr1, arr2) => {
    let isArr1 = Object.prototype.toString.call(arr1) == '[object Array]';
    let isArr2 = Object.prototype.toString.call(arr2) == '[object Array]';

    if (!isArr1 || !isArr2) {
        throw new Error('参数必须是数组');
    }

    if (arr1 === arr2) {
        return true;
    }

    if (arr1.length != arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

//===============Class================//
/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @return {Boolean}
 */

const hasClass = (ele, cls) => {
    if (!ele) {
        throw new Error('document element can not be empty');
    }

    if (!cls) {
        throw new Error('class can not be empty');
    }

    return (new RegExp(`(\\s|^)${cls}(\\s|$)`)).test(ele.className);
};

/**
 * @desc 为元素添加class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
const addClass = (ele, cls) => {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
};

/**
 * @desc 为元素删除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
const removeClass = (ele, cls) => {
    if (hasClass(ele, cls)) {
        let reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        ele.className = ele.className.replace(reg, '');
    }
};

//===============Cookie================//
/**
 * @desc 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
const setCookie = (name, value, days) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date}`;
};

/**
 * @desc 删除cookie
 * @param {String} name
 */
const removeCookie = (name) => {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, '1', -1);
};

/**
 * @desc 获取cookie
 * @param {String} name
 * @return {String}
 */
const getCookie = (name) => {
    let arr = document.cookie.replace(/\s/g, '').split(';');
    for (let i = 0, len = arr.length; i < len; i++) {
        let tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }

    return '';
}

//===============Device================//
/**
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
const getBrowser = () => {
    let system = {},
        ua = navigator.userAgent.toLowerCase(),
        s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;

    // 根据关系判断
    if (sys.ie) return (`IE: ${sys.ie}`);
    if (sys.edge) return (`EDGE: ${sys.edge}`);
    if (sys.firefox) return (`Firefox: ${sys.firefox}`);
    if (sys.chrome) return (`Chrome: ${sys.chrome}`);
    if (sys.opera) return (`Opera: ${sys.opera}`);
    if (sys.safari) return (`Safari: ${sys.safari}`);

    return 'Unkonwn';
};

/**
 * @desc 获取操作系统类型
 * @return {String}
 */
const getOS = () => {
    let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX';
    if (/win/i.test(appVersion)) return 'windows';
    if (/linux/i.test(appVersion)) return 'linux';
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
};

//===============Document================//
/**
 * @desc 获取滚动调距顶部的距离
 */
const getScrollTop = () => {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
};

/**
 * @desc 设置滚动条距顶部距离
 */
const setScrollTop = (value) => {
    window.scrollTo(0, value);
    return value;
};

/**
 * @desc 获取一个元素距离文档（document)的位置，类似JQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
const offset = (ele) => {
    let position = {
        left: 0,
        top: 0,
    };
    while (ele) {
        position.left += ele.offsetLeft;
        position.top += ele.offsetTop;
        ele = ele.offsetParent;
    };

    return position;
}

/**
 * @desc 在duration时间内，滚动条平滑滚动到to指定位置
 * @param {Number} to
 * @param {Number} duration
 */
const requestAnimFrame = () => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
};
const scrollTo = (to, duration) => {
    if (isNaN(Number(to))) {
        throw Error('distance must be a number or string');
    }

    if (isNaN(Number(duration))) {
        throw new Error('time must be a number or string');
    }

    if (duration < 0) {
        setScrollTop(to);
        return;
    }

    let diff = to - getScrollTop();
    if (diff === 0) return;
    let step = diff / duration * 10;
    requestAnimationFrame(() => {
        if (Math.ads(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }
        setScrollTop(getScrollTop() + step);
        if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
            return;
        }

        scrollTo(to, duration - 16);
    });
};

//===============KeyCode================//
const keyCodeMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    42: 'Print Screen',
    45: 'Insert',
    46: 'Delete',

    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',

    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    91: 'Windows',
    93: 'Right Click',

    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',

    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',

    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\'',
};
/**
 * @desc 根据keycode获得键名
 * @param {Number} keycode
 * @return {String}
 */
const getKeyName = (keycode) => {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log(`Unknow Key(Key Code: ${keycode})`);
        return '';
    }
};

//===============Object================//
/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
const deepClone = (values) => {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || 'object' != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (let i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }

        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                copy[key] = deepClone(values[key]);
            }
        }

        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
};

/**
 * @desc 判断obj是否为空
 * @param {Object} obj
 * @return {Boolean}
 */
const isEmptyObject = (obj) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }

    return !Object.keys(obj).length;
};

//===============Random================//
/**
 * @desc 随机生成颜色
 * @return {String}
 */
const randomColor = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
};

//===============Regexp================//
/**
 * @desc 判断是否为邮箱地址
 * @param {String} str
 * @return {Boolean}
 */
const isEmail = (str) => {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
};

/**
 * @desc 判断是否为身份证号
 * @param {String|Number} str
 * @return {Boolean}
 */
const isIDCard = (str) => {
    let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return reg.test(str);
};

/**
 * @desc 判断是否为手机号
 * @param {String|Number} str
 * @return {Boolean}
 */
const isPhone = (str) => {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(str);
};

/**
 * @desc 判断是否URL地址
 * @param {String} str
 * @return {Boolean}
 */
const isUrl = (str) => {
    let reg = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    return reg.test(str);
};

//===============filter================//
/**
 * @desc 现金额转大写
 * @param {Number} num
 * @return {String}
 */
const digitUppercase = (num) => {
    if (isNaN(Number(num))) {
        console.log('param must be a number or string');
        return false;
    }

    let fraction = ['角', '分'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟'],
    ];

    let head = num < 0 ? '欠' : '';
    num = Math.abs(num);
    let s = '';
    for (let i = 0, len = fraction.length; i < len; i++) {
        s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0, len = unit[0].length; i < len && num > 0; i++){
        let p = '';
        for (let j = 0, len = unit[1].length; j < len && num > 0; j++) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }

        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

const isSupportWebP = () => {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
};

//===============Time================//
/**
 * @desc 日期对象封装，日期格式化，获得年、月、日
 * @return {String}
 */
const clone = (d) => {
    return new Date(d.getTime());
};

const pad = (v) => {
    return (`0${v}`).slice(-2);
};

const Moment = function (d) {
    if (d instanceof Moment) {
        this.d = clone(d.d);
        return;
    }
    if (!d) {
        this.d = new Date();
        return;
    }
    this.d = new Date(d);
};
Moment.prototype = {
    addMonths(n) {
        const d = this.d;
        this.d.setMonth(d.getMonth() + n);
        return this;
    },
    addDate(n) {
        const d = this.d;
        this.d.setDate(d.getDate() + n);
        return this;
    },
    format(str) {
        if (!str) {
            str = 'YYYY-MM-DD';
        }
        const d = this.d;
        return str.replace('YYYY', d.getFullYear())
            .replace('MM', pad(d.getMonth() + 1))
            .replace('DD', pad(d.getDate()))
            .replace('d', d.getDay());
    },
    year(n) {
        if (n) {
            this.d.setYear(n);
            return this;
        }
        return this.d.getFullYear();
    },
    month(n) {
        if (n) {
            this.d.setMonth(n);
            return this;
        }
        return this.d.getMonth();
    },
    date(n) {
        if (n) {
            this.d.setDate(n);
            return this;
        }
        return this.d.getDate();
    },
    day() {
        return this.d.getDay();
    },
};

/**
 * @desc 格式化${startTime}距现在的已过时间
 * @param {Date} startTime
 * @return {String}
 */
const formatPassTime = (startTime) => {
    if (isNaN(Number(startTime))) {
        startTime = Date.parse(new Date(startTime));
    }

    let currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);

        // 返回格式后时间
        if (year) return year + '年前';
        if (month) return month + '个月前';
        if (day) return day + '天前';
        if (hour) return hour + '小时前';
        if (min) return min + '分钟前';
        else return '刚刚';
};

/**
 * @desc 格式化现在距${endTime}的剩余时间
 * @param {Date} endTime
 * @return {String}
 */
const formatRemainTime = (endTime) => {
    let startDate = new Date(); // 开始时间
    let endDate = new Date(endTime); // 结束时间
    let t = endDate.getTime() - startDate.getTime(); // 时间差
    let d = 0, h = 0, m = 0, s = 0;

    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }

    return `${d}天${h}小时${m}分钟${s}秒`;
};

//===============Url================//
/**
 * @desc url参数转对象
 * @param {String} url default: window.location.href
 * @return {Object}
 */
const parseQueryString = (url) => {
    url = !url ? window.location.href : url;
    let search = url.substring(url.lastIndexOf('?') + 1);

    if (!search) {
        return {};
    }

    let obj = JSON.parse('{"'+ decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    return obj;
};

const parseUrlQuery = (str) => {
    const ret = {};
    str = !str ? window.location.href : str;
    let search = str.substring(str.lastIndexOf('?') + 1);

    if (!search) {
        return {};
    }

    str.replace(/^\?/, '').split('&').forEach((item) => {
        const s = item.split('=');
        const key = s[0];
        const value = s[1];
        ret[key] = decodeURIComponent(s[1]);
    });
    return ret;
};

/**
 * @desc 对象序列化
 * @param {Object} obj
 * @return {String}
 */
const stringifyQueryString = (obj) => {
    if (!obj) return '';
    let pairs = [];

    for (let key in obj) {
        let value = obj[key];

        if (value instanceof Array) {
            for (let i = 0, len = value.length; i < len; i++) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }

        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }

    return pairs.join('&');
};

const stringifyUrlQuery = (data) => {
    if (!data) return '';

    const ret = [];
    for(let k in data) {
        const value = encodeURIComponent(data[k])
        ret.push(`${k}=${value}`)
    }
    return ret.join('&');
}


export {
    arrayEqual,
    hasClass,
    addClass,
    removeClass,
    setCookie,
    getCookie,
    removeCookie,
    getBrowser,
    getOS,
    getScrollTop,
    setScrollTop,
    offset,
    scrollTo,
    getKeyName,
    deepClone,
    isEmptyObject,
    isEmail,
    isIDCard,
    isPhone,
    isUrl,
    digitUppercase,
    isSupportWebP,
    Moment,
    formatPassTime,
    formatRemainTime,
    parseQueryString,
};
