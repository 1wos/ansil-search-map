INSERT INTO programs (id, name, region_city, region_district, category, target_gender, target_household, target_income, target_age, support_detail, cost, how_to_apply, apply_period, apply_url, contact, status, source_url, keywords) VALUES

('seoul-gwanak-ansim-3set', '여성 1인가구 안심홈 3종세트', '서울특별시', '관악구', '주거안전', '여성', '1인가구', '전세보증금 1.5억 미만', NULL, '현관문보조키, 문열림센서, 휴대용비상벨 3종 일괄 무상 지급', '무료', '관악구청 홈페이지 신청서 다운 후 이메일(wys550@ga.go.kr) 또는 팩스 제출', '예산 소진 시까지', 'https://www.gwanak.go.kr', '여성가족과 02-879-6122', '신청가능', 'https://www.gwanak.go.kr/site/enews/news/news_view.do?mvid=1309&aid=9973', ARRAY['안심홈','현관문','보조키','비상벨','문열림센서']),

('seoul-all-ansim-scout', '안심귀가스카우트', '서울특별시', '전체', '귀가안전', '무관', '무관', NULL, NULL, '평일 22시~새벽2시, 2인1조 스카우터가 귀가 동행. 범죄취약지역 순찰 겸 수행.', '무료', '이용 30분 전 120 다산콜센터 또는 자치구 상황실 전화, 안심이 앱으로 신청', '상시', NULL, '120 다산콜센터', '신청가능', 'https://news.seoul.go.kr/welfare/archives/517373', ARRAY['안심귀가','귀갓길','야간','동행','스카우트']),

('seoul-all-hospital', '병원 안심동행서비스', '서울특별시', '전체', '건강', '무관', '무관', '중위소득 100% 이하 연 48회 무료', '만 12세 이상', '병원 출발~귀가 동행, 접수·수납·진료 동행, 약품수령 지원. 평일 07~20시.', '시간당 5,000원 (중위소득 100% 이하 연 48회 무료)', '1인가구포털(1in.seoul.go.kr) 또는 콜센터 1533-1179 신청', '상시', 'https://1in.seoul.go.kr', '1533-1179', '신청가능', 'https://news.seoul.go.kr/welfare/archives/537252', ARRAY['병원','동행','진료','아플때','의료']),

('seoul-all-door-guard', '1인가구 안전 도어지킴이', '서울특별시', '전체', '주거안전', '무관', '1인가구', NULL, '만 18세 이상', '도어카메라+긴급출동서비스 결합 보안서비스. 월 18,750원에서 월 9,900원으로 3년간 지원.', '월 9,900원 (3년 지원)', '씽글벙글 서울 포털에서 신청', '예산 소진 시까지', 'https://1in.seoul.go.kr', '120 다산콜센터', '신청가능', 'https://50plus.or.kr/detail.do?id=14190050', ARRAY['도어카메라','긴급출동','보안','현관','CCTV']),

('seoul-all-ansim-parcel', '여성안심택배 (무인택배보관함)', '서울특별시', '전체', '생활지원', '여성', '1인가구', NULL, NULL, '무인택배보관함에서 원하는 시간에 비대면 택배 수령. 택배기사 가장 범죄 예방.', '무료', '거주지 인근 무인택배보관함 이용', '상시', 'https://1in.seoul.go.kr', '각 자치구 여성가족과', '신청가능', 'https://1in.seoul.go.kr', ARRAY['택배','무인','보관함','비대면']),

('seoul-all-housing-mgmt', '1인가구 주택관리서비스', '서울특별시', '전체', '생활지원', '무관', '1인가구', '기준중위소득 120% 이하 (2,870,416원)', NULL, '신속생활불편처리(형광등·콘센트 교체 등), 홈케어(집수리 연계), 클린케어(청소·수납정리)', '무료', '주거안심종합센터 연락 또는 1in.seoul.go.kr 신청', '상시', 'https://housing.seoul.go.kr/site/main/content/sh01_061028', '주거안심종합센터', '신청가능', 'https://housing.seoul.go.kr/site/main/content/sh01_061028', ARRAY['주택관리','집수리','청소','형광등','수리']),

('daejeon-junggu-ansim-3set', '여성 1인가구 안심홈 3종 세트', '대전광역시', '중구', '주거안전', '여성', '1인가구', NULL, NULL, '현관문 보조키, 문열림 센서, 휴대용 비상벨 3종 지원', '무료', '중구청 여성가족과 또는 동 행정복지센터 문의', '예산 소진 시까지', NULL, '중구청 여성가족과 042-606-7213', '신청가능', 'https://www.djjunggu.go.kr', ARRAY['안심홈','보조키','비상벨','대전']),

('daegu-junggu-safe-home', '세이프홈(Safe-Home) 지원사업', '대구광역시', '중구', '주거안전', '여성', '1인가구', NULL, NULL, 'A세트(스마트초인종+가정용CCTV+문열림센서+택배안심지우개) 또는 B세트(AI보안기계 캡스홈 도어가드) 중 택1', '무료', '중구 가족센터 방문 또는 이메일 접수. 선착순.', '공고일~10월 31일', NULL, '중구 가족센터', '미확인', 'https://www.idaegu.com/news/articleView.html?idxno=616245', ARRAY['세이프홈','스마트초인종','CCTV','도어가드','대구']),

('gyeonggi-all-ansim-pkg', '여성 1인가구 안심패키지', '경기도', '전체 (시·군별 상이)', '주거안전', '여성', '1인가구', '시·군별 상이', NULL, '스마트홈카메라, 스마트 문열림센서, 스마트도어벨, 창문잠금장치, 호신용 스틱/스프레이 택배 발송', '무료', '경기민원24(gg24.gg.go.kr) 온라인 신청 또는 시·군청 방문', '6월~7월 (목표 미달 시 연장)', 'https://gg24.gg.go.kr', '각 시·군 담당자', '신청가능', 'https://gg24.gg.go.kr/svcreqst/selectSvcReqst.do?svc_seq=921', ARRAY['안심패키지','홈카메라','도어벨','경기도']),

('national-safety-house', '여성안심지킴이집', '전국', '전체', '귀가안전', '여성', '무관', NULL, NULL, '24시간 운영 편의점을 지킴이집으로 지정. 위급 시 비상벨 누르면 112 연결, 경찰 즉시 출동.', '무료', '별도 신청 불필요. 위급 시 스티커 부착 편의점 방문', '상시', NULL, '112', '신청가능', 'https://www.data.go.kr/data/15034535/standard.do', ARRAY['지킴이집','편의점','비상벨','112','긴급'])

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_city = EXCLUDED.region_city,
  region_district = EXCLUDED.region_district,
  category = EXCLUDED.category,
  target_gender = EXCLUDED.target_gender,
  target_household = EXCLUDED.target_household,
  target_income = EXCLUDED.target_income,
  target_age = EXCLUDED.target_age,
  support_detail = EXCLUDED.support_detail,
  cost = EXCLUDED.cost,
  how_to_apply = EXCLUDED.how_to_apply,
  apply_period = EXCLUDED.apply_period,
  apply_url = EXCLUDED.apply_url,
  contact = EXCLUDED.contact,
  status = EXCLUDED.status,
  source_url = EXCLUDED.source_url,
  keywords = EXCLUDED.keywords,
  updated_at = NOW();