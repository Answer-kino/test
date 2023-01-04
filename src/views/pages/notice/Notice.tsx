import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const Notice = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const source = {
    html: `
    <div class="entry-content">
    <p>안녕하세요. <span style="color: #00aa00;">NAVER WORKS</span> 입니다.</p>
<p>​</p>
<p>네이버웍스 v3.5 정기 업데이트가 2022년 10월 중에 예정되어 있습니다.</p>
<p>10월에 진행될 업데이트에서 네이버웍스 서비스 공식 지원 환경 변경, 사용성이 낮은 기능에 대한 사양 변경 및 종료되는 기능이 있어 사전 안내 드립니다. 향후 정기 업데이트 날짜에 맞춰 자세한 내용은 다시 안내드리도록 하겠습니다.</p>
<p>※ 정기 업데이트 날짜와 사전 안내된&nbsp;내용은 업데이트 시에 변경될 수 있습니다.</p>
<p><strong>&nbsp;</strong></p>
<p><strong>■</strong><strong> 서비스 공식 지원 환경 변경</strong></p>
<p>안정적인 서비스 제공을 위해 다음 정기 업데이트부터 네이버웍스 모바일앱의 사용 권장 환경을 상향합니다. 원활한 서비스 이용을 위해 공식 지원 환경에서 사용하시는 것을 권장합니다. 공식 지원 환경 외에서 발생하는 오류에 대해서는 보장하지 않습니다.</p>
<p>&nbsp;</p>
<p><strong>[모바일앱]</strong></p>
<p>– Android: 6.0 -&gt; 7.0 이상으로 상향</p>
<p>– iOS: 12.0 -&gt; 13.0 이상으로 상향</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>■</strong><strong> 서비스 주요 기능 변경 및 종료</strong></p>
<p>&nbsp;</p>
<p><strong>[공통]</strong></p>
<p>– 화상회의 모듈 변경 및 개선으로 신/구 앱 간 화상회의 호환이 지원되지 않습니다.<span style="color: #ff0000;"> <del>불가해, 안정적인 서비스 제공을 위해 강제 업데이트를 진행합니다.</del> </span>안정적인 서비스 이용을 위해 업데이트를 진행해주세요.</p>
<p>※ 신/구앱 간 화상 회의 진행 중에 화면 공유를 실행하면, 공유된 화면이 보이지 않고 업데이트 알림이 노출됩니다.</p>
<p>– 네이버웍스 서비스의 접속 보안을 강화하기 위해 TLS 1.0~1.1 지원을 종료합니다.</p>
<p>모바일앱, PC앱/웹에서 네이버웍스를 사용하기 위해서는 웹 브라우저 및 OS 환경이 TLS 1.2 이상 환경을 지원해야합니다.</p>
<p><span style="color: #ff0000;">단, 네이버웍스와 연동하여 개발한 사내시스템이 아래에 해당하는 경우 TLS 1.0~1.1을 11/30일까지 지원할 예정입니다. 원활한 서비스 사용을 위해 네이버웍스와 연동된 시스템의 업데이트 혹은 TLS 1.2 이상의 환경을 지원하도록 구성해주세요.</span></p>
<p style="padding-left: 40px;"><span style="color: #808080;"><span style="font-size: 16px;"><span style="font-size: 16px; color: #808080;">1. </span>Java 8 (2014년 출시) 미만을 활용하여 개발한 앱에서 API 혹은 네이버웍스 웹서버 호출 시<br>
</span><span style="font-size: 16px;"><span style="font-size: 16px; color: #808080;">2. </span>Python 2.7미만 (2010년 출시) 또는 Openssl 1.0.1 미만 (2012년 출시)에서 API나 네이버웍스 웹서버를 호출 시</span></span></p>
<p>– 그룹 노트에서 제공하는 수정/복원 이력이 최근 30건 이내로 축소됩니다.</p>
<p>&nbsp;</p>
<p><strong>[드라이브]</strong><br>
– Windows Drive탐색기의 W: 마운트 드라이브 내에서 제공했던 공유 드라이브와 그룹 폴더가 ‘내 드라이브’가 위치한 ‘NAVER WORKS Drive’ 폴더에 통합되어 제공됩니다.</p>
<p style="padding-left: 40px;"><span style="color: #ff6600; font-size: 16px;">* 아래 주의사항을 꼭 참고해주세요.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">※ ‘내 드라이브’와 ‘공유 받은 폴더’의 폴더를 별도 그룹핑없이 최상위 루트에서 직접 보여주던 방식에서 ‘내 드라이브’, ‘공유 받은 폴더’, ‘그룹 폴더’, ‘공유 드라이브’ 하위에 그룹핑하여 노출하는 방식으로 변경됩니다. 폴더의 경로가 변경되므로, 외부 앱에서 해당 폴더를 참조 경로로 설정해놓은 경우, 변경된 경로로 재 설정을 해주세요.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">※ 업데이트 이후 [모니터 우측 하단에 Drive탐색기 트레이 아이콘을 오른쪽 마우스로 클릭 &gt; 환경설정 클릭]하여 동기화 할 ‘공유 드라이브’ &amp; ‘그룹 폴더’를 선택할 수 있습니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">※ 동기화 설정 및 폴더 위치 통합 과정에서 일정 시간이 소요되오니 가급적 주요 업무 시간을 피해서 업데이트 진행을 부탁드립니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">※ 팀/그룹 폴더와 공유 드라이브에서 파일 경로가 255자를 초과하는 경우, 동기화가 완료되어도 파일이 열리지 않을 수 있습니다. 그러한 경우에는 다음과 같이 조치 부탁드립니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">&nbsp; &nbsp;1) 파일이 저장되어 있는 폴더명을 5자 이내로 수정</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">&nbsp; &nbsp;2) 파일이 있는폴더를 상위 폴더로 이동</span></p>
<p>&nbsp;</p>
<p><strong>[메시지]</strong><br>
– PC 앱에서 화면 공유 시 사용하는 네트워크 대역폭을 줄이고, 사용자의 조작없이 네트워크 환경에 따라 화면 프레임이 자동 조절되도록 개선됩니다. 이에 사용자가 직접 ‘화면 프레임 수치’를 설정할 수 있는 기능을 종료합니다.</p>
<p>– v3.5 업데이트 이후부터 메시지방에 할당되는 channelID가 구성원과 그룹에 할당되는 resourceID와 유사한 포맷으로 변경됩니다. 업데이트 이전에 할당된 channelID는 변경되지 않습니다.</p>
<p>&nbsp;</p>
<p><strong>[주소록]</strong></p>
<p>– 안정적인 서비스 제공을 위해 고객사별로 ‘전체 공개’ 연락처 숫자가 50,000개로 제한되며, 구성원이 소유할 수 있는 ‘멤버 공개’ 연락처는 최대 50,000개로 제한됩니다.</p>
<p>&nbsp;</p>
<p><strong>[메일]</strong></p>
<p>– PC웹 메일 목록에 노출되는 메일 제목 앞 ‘TO’ 아이콘 클릭 시 연결되는 ‘내가 수신인에 포함된 메일’ 필터 기능이 제거됩니다. 내가 수신인에 포함된 메일을 따로 필터링해서 보고싶을 경우, 좌측 메뉴 영역 상단에 위치한 ‘TO 받는 사람’을 선택하거나 메일 목록에서 ‘나에게 온 메일’로 필터링하여 볼 수 있습니다.</p>
<p>– 안정적인 메일 서비스 제공을 위해 구성원별로 수신할 수 있는 메일 통수가 다음과 같이 제한됩니다.</p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">1. (구성원별) 1시간 동안 수신할 수 있는 메일: 최대 3,600통</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">2. (구성원별) 하루 동안 수신할 수 있는 메일: 최대 86,400통</span></p>
<p style="padding-left: 40px;"><span style="color: #808080; font-size: 16px;">※ 제한 통수를 초과하여 메일이 수신될 경우, 일시적으로 메일 수신이 불가합니다.</span></p>
<p>– PC웹에서 한국어 및 일본어 사용자에게 번역 언어를 자동 노출하던 동작이 변경됩니다. 번역이 필요한 경우 메일 본문의 우측 상단에 ‘번역’을 선택, 번역 툴바에서 언어와 범위를 선택한 후 번역된 본문을 확인할 수 있습니다.</p>
<p>&nbsp;</p>
<p><strong>[할 일]</strong></p>
<p>– ‘보낸 할 일’ 기준이 변경됩니다. 자신이 요청자로 설정된 할 일만 ‘보낸 할 일 및 [캘린더 &gt; 개인 일정 (일/주/월간 &amp; 목록)]에 노출되며, 이전에 자신이 담당자였거나 요청자였던 할 일 또는 자신이 요청자나 담당자는 아니지만 등록한 할 일은 더 이상 ‘보낸 할 일’에 노출되지 않습니다.</p>
<p>&nbsp;</p>
<p><strong>[Admin]</strong></p>
<p>– [보안 &gt; 계정 보안 &gt; 모바일앱 간편 로그인] 제공 방식이 변경되어, ‘모바일앱 간편 로그인’ 설정을 비활성화하면 더 이상 간편 로그인 기능을 이용할 수 없습니다. 신규 출시 예정인 ‘휴대폰 잠금해제로 로그인’ 기능을 이용해주세요. (* SSO 연동 중인 고객사는 해당 없음)</p>
<p>– [모니터링 &gt; 메일 발신]에서 특정 메일에 여러 정책이 중복 적용되는 경우, 가장 오래된 정책 -&gt; 가장 최신 정책을 적용하는 것으로 변경됩니다.</p>
<p>– [감사 &gt; 로그인] 로그 다운로드 시 항목이 변경됩니다.</p>
<p style="padding-left: 40px;"><span style="color: #808080; font-size: 16px;"><span style="color: #808080;"><span style="font-size: 16px;">1. </span></span>AS-IS: </span><span style="color: #808080; font-size: 16px;">날짜 / 사용자 / 설명 / 서비스 타입 / IP 주소</span></p>
<p style="padding-left: 40px;"><span style="color: #808080; font-size: 16px;"><span style="color: #808080;"><span style="font-size: 16px;">2. </span></span>TO-BE: </span><span style="color: #808080; font-size: 16px;">설명 / 사용자 / 날짜 / IP 주소 / 로그인 수단 / 서비스 타입</span></p>
<p>– [모니터링 &gt; 메시지]에서 정책 적용 기준이 변경됩니다.</p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">1. 이제 공백을 제외한 특수문자는 하나의 키워드로서 검색됩니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">2. 1개 문자만 키워드로 입력한 경우 무조건 검색됩니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">3. 보낸 사람 조건과 받는 사람 조건에 동일한 구성원이 등록된 경우 해당 구성원이 보낸 메시지는 검색되지 않습니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">4. ‘받는 사람’ 조건을 더 정확하게 검색합니다.</span></p>
<p style="padding-left: 40px;"><span style="font-size: 16px; color: #808080;">5. 모니터링 정책 결과를 실시간으로 확인할 수 있습니다.</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>앞으로도 더 좋은 서비스를 제공하기 위해 지속적으로 개선해 나가겠습니다.</p>
<p>감사합니다.</p>
<p>&nbsp;</p>
</div>`,
  };
  return (
    <View>
      <TopNav navigation={navigation} title="공지사항" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>캐피탈 서비스 점검 안내</Text>
          <RenderHtml source={source} />
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 10,
    minHeight: 400,
  },
  commentContainer: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  Button: {
    backgroundColor: 'white',
    height: 57,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ButtonText: {
    fontSize: 17,
    lineHeight: 18,
    color: '#2C2C2C',
  },
});

export default Notice;
