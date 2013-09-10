<?php
	$datestring = 'first day of last month';
	$lastMonth = date_create($datestring);

	echo file_get_contents('http://gs.statcounter.com/chart.php?bar=1&statType_hidden=resolution&region_hidden=ww&granularity=monthly&statType=Screen%20Resolution&region=Worldwide&fromMonthYear='.$lastMonth->format('Y').'-'.$lastMonth->format('m').'&toMonthYear='.date('Y').'-'.date('d'));
?>