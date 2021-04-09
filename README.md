# WSG PATH

## DESCRIPTION

기존의 사용 중인 퍼블리싱 화면 리스트의 히스토리 관리와 모바일 해상도 미 대응으로 인한
불편함을 개선하고자 새롭게 리뉴얼한 퍼블리싱 스타일 가이드 프로젝트입니다.

각 화면에 대한 데이터는 트리 구조 형태로 JSON 파일로 관리합니다.

Webpack, PostCSS 설정을 통해 모듈 단위로 파일을 구성하였습니다.

--------------------------------------------------------

## 개발 환경      
OS: WSL

--------------------------------------------------------

## 데이터 구조 
```
{
    "_depID": "DEPTH",  // Stinrg | Number
    "title": "제목", // String
    "url": "URL", // String
    "state": "작업 상태", // String [ none, soon, ing, complete, delete ]
    "history": "변경 사항 - 일자 별로 관리", // Object { key: String, value: Array }
    "children": "하위 메뉴" // Array 동일한 구조의 형태로 하위 반복
}

ex) {
    "_depID": "1",
    "title": "1depth 메뉴",
    "url": "",
    "state": "none",
    "history": {
        "YYYY-MM-DD": [ "변경 사항", "변경사항" ... "변경사항" ],
        "YYYY-MM-DD": [ "변경 사항", "변경사항" ... "변경사항" ]
    },
    "children": [{
        "_depID": "2",
        "title": "2depth 메뉴",
        "url": "html/**/*.html",
        "state": "complete",
        "history": {
            "YYYY-MM-DD": [ "변경 사항", "변경사항" ... "변경사항" ]
        },
        "children": []
    }]
}
```

## 명령어
```
    npm run dev
```

```
    npm run build
```
