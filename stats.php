<?php
	// http://gs.statcounter.com/chart.php?bar=1&statType_hidden=resolution&region_hidden=ww&granularity=monthly&statType=Screen%20Resolution&region=Worldwide&fromMonthYear=2013-08&toMonthYear=2013-08
	echo file_get_contents('http://gs.statcounter.com/chart.php?bar=1&statType_hidden=mobile_resolution&region_hidden=ww&granularity=monthly&statType=Mobile%20Screen%20Resolution&region=Worldwide&fromMonthYear=2013-08&toMonthYear=2013-08');
?>