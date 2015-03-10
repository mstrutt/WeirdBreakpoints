<?php
	$datestring = 'first day of last month';
	$lastMonth = date_create($datestring);
	$fromDate = $lastMonth->format('Y').'-'.$lastMonth->format('m');
	$toDate = date('Y').'-'.date('d');
	$fromInt = $lastMonth->format('Y').$lastMonth->format('m');
	$toInt = date('Y').date('m');

	echo file_get_contents("http://gs.statcounter.com/chart.php?$toInt=undefined&bar=1&device=Mobile&device_hidden=mobile&statType_hidden=resolution&region_hidden=ww&granularity=monthly&statType=Screen%20Resolution&region=Worldwide&fromInt=$fromInt&toInt=$toInt&fromMonthYear=$fromDate&toMonthYear=$toDate&multi-device=true");
?>
