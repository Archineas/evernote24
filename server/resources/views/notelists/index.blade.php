<!DOCTYPE html>
<html>
<head>
    <title>KWM Evernote</title>
</head>
<body>
<p>test!</p>
<ul>
    @foreach($notelists as $list)
        <li><a href="notelists/{{$list->id}}">{{$list->title}}</a></li>
    @endforeach
</ul>

</body>
</html>
