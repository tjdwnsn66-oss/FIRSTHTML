// 간단한 상호작용: 레시피 상세 보기 토글, 식단표 복사 및 인쇄
document.addEventListener('DOMContentLoaded', function(){
  // 레시피 상세 토글
  document.querySelectorAll('.toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      const details = btn.parentElement.querySelector('.details');
      if(!details) return;
      const isHidden = details.hasAttribute('hidden');
      if(isHidden){
        details.removeAttribute('hidden');
        btn.textContent = '접기';
      } else {
        details.setAttribute('hidden','');
        btn.textContent = '상세보기';
      }
    });
  });

  // 식단표 인쇄
  const printBtn = document.getElementById('print-plan');
  printBtn.addEventListener('click', function(){ window.print(); });

  // 식단표 복사
  const copyBtn = document.getElementById('copy-plan');
  copyBtn.addEventListener('click', async function(){
    const table = document.querySelector('#meal-plan table');
    if(!table) return;
    // 텍스트 형태로 복사
    let text = '';
    table.querySelectorAll('tr').forEach(function(row){
      const cols = [...row.querySelectorAll('th,td')].map(td => td.innerText.trim());
      text += cols.join('\t') + '\n';
    });
    try{
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = '복사됨 ✓';
      setTimeout(()=> copyBtn.textContent = '클립보드로 복사', 1500);
    }catch(e){
      alert('클립보드 복사에 실패했습니다. 브라우저 권한을 확인하세요.');
    }
  });
});
