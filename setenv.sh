#! /bin/sh

DESIREDENV=$1

OLDEXPORT=""
NEWEXPORT=""

if [ $DESIREDENV = "prod" ]
then
   OLDEXPORT="serverUrl = serverUrlStaging"
   NEWEXPORT="serverUrl = serverUrlProd"
else
   OLDEXPORT="serverUrl = serverUrlProd"
   NEWEXPORT="serverUrl = serverUrlStaging"
fi

grep -rl "$OLDEXPORT" ./src | xargs sed -i "s/$OLDEXPORT/$NEWEXPORT/g"
