
import { expect } from 'chai';
import {
    arrayEqual,
    isEmptyObject,
    isEmail,
    isIDCard,
    isPhone,
    isUrl,
    digitUppercase,
} from '../index';

describe("判断两个数组是否相等", () => {
    let arr1 = [1, 2, 3], arr2 = [4, 5, 6];
    let a = arr1, b = arr1, c = arr2;

    it("a 和 b 是赋值，是同一个数组，是相等", () => {
        expect(arrayEqual(a, b)).to.be.ok;
    });
    it("a 和 c 是赋值，数组1 和数组2 比较引用值，执指向不是同一个对象，不等", () => {
        expect(arrayEqual(a, c)).to.not.be.ok;
    });
    it("arr1 和 arr2 指针指向内存地址不同，不等", () => {
        expect(arrayEqual(a, c)).to.false;
    });
});

describe("判断对象是否为空", () => {
    let obj1 = {},
        obj2 = {
            name: 'javascript'
        };
    let arr1 = [], arr2 = ['1', '2'];

    it("obj1是空对象", () => {
        expect(isEmptyObject(obj1)).to.true;
    });
    it("obj2是非空对象", () => {
        expect(isEmptyObject(obj2)).to.false;
    });
    it("arr1是空数组对象，不检测数组，返回false", () => {
        expect(isEmptyObject(arr1)).to.false;
    });
    it("arr2是非空数组对象，不检测数组，返回false", () => {
        expect(isEmptyObject(arr2)).to.false;
    });
});

describe("判断邮箱地址", () => {
    let email1 = '123456789@qq.com',
        email2 = '12345678qq.com',
        email3 = '12345678@qorg';

    it("email1是完整邮箱地址", () => {
        expect(isEmail(email1)).to.be.ok;
    });
    it("email2是缺少@，不是完整邮箱地址", () => {
        expect(isEmail(email2)).to.not.be.ok;
    });
    it("email3是不是正确邮箱地址", () => {
        expect(isEmail(email3)).to.not.be.ok;
    });
});

describe("判断身份证号码", () => {
    let idCard1 = '510722199202192936',
        idCard2 = '510722199222192936',
        idCard3 = '51072219920219293';

    it("idCard1是正确的身份证号码", () => {
        expect(isIDCard(idCard1)).to.be.ok;
    });
    it("idCard2月份不正确，不是正确的身份证号码", () => {
        expect(isIDCard(idCard2)).to.not.be.ok;
    });
    it("idCard3缺少校验码，不正确", () => {
        expect(isIDCard(idCard3)).to.not.be.ok;
    });
});

describe("判断手机号码", () => {
    let phone1 = '18227766736',
        phone2 = '18327788773',
        phone3 = '17183728374';

    it("phone1是正确手机号码", () => {
        expect(isPhone(phone1)).to.be.ok;
    });
    it("phone2是正确手机好码", () => {
        expect(isPhone(phone2)).to.be.ok;
    });
    it("phone3不是正确手机号码", () => {
        expect(isPhone(phone3)).to.not.be.ok;
    });
});

describe("判断URL地址", () => {
    let url1 = 'https://www.baidu.com/',
        url2 = '12345';

    it("url1是正确的URL地址", () => {
        expect(isUrl(url1)).to.be.ok;
    });
    it("url2是不正确URL地址", () => {
        expect(isUrl(url2)).to.not.be.ok;
    });
});

describe("金额大写转换", () => {
    let num1 = 300, num2 = 'abc';
    it("num1是数字，转换正确", () => {
        expect(digitUppercase(num1)).to.be.ok;
    });
    it("num2不是数字，转换不正确", () => {
        expect(digitUppercase(num2)).to.not.be.ok;
    });
});
