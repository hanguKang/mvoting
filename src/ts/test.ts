import hello from './components/utils' //tsconfig의 compilerOptions.paths 절대경로 설정
//import $ from 'jquery'

function aplus(a: number, b: number) : void {
  console.log(a+b);
}
hello('typescript');
aplus(19, 20);

// $(function(){
//   $('dt').on('click',function(){
//     console.log('test'+1234);
//   });

// });

//npm i -D ts-node를 설치하면 tsc로 컴파일 하지 않고도 ts-node typescript.ts 파일을 바로 실행할 수 있다. 
//npm i nodemon 을 설치하고 package.json에서 "dev": "nodemon --exec ts-node ./src/index.ts" 또는 nodemon --exec ts-node ./src/index.ts 또는 npm run dev 이제 코드를 변경 후 저정할 때마다 터미널에 실행결과가 나오게 됩니다.
//node나 react같은 외부 패키지를 타입스크립트에서 사용하려면 .d.ts 같은 선언파일이 작성되어야 합니다. 노드 패키지에 들어가면 수많은 .d.ts파일들이 있습니다.ex> import로 불러들일 수 없는 외부 패키지 등을 사용하기 위해서, ex>  node 선언파일 설치  npm i -d @types/node  react 선언파일 설치 npm i -d @types/react npm i -d @types/jquery