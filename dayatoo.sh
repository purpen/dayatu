#! /bin/sh
NODE_ENV=production
DAEMON="node cluster.js"
NAME=Dayatu
DESC=Dayatu
PIDFILE="dayatu.pid"

case "$1" in
	start)
		echo "Starting $DESC ..."
		nohup $DAEMON > /dev/null &
		echo $! > $PIDFILE
		;;
	stop)
		echo "Stopping $DESC ... "
		pid=`cat $PIDFILE`
		kill $pid
		rm $PIDFILE
		;;
	status)
	      ps -ef | grep dayatu
	      ;;
esac

exit 0
