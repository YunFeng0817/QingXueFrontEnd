if($args.Length -ne 1){
    Write-Output "usage: [path] (the absolute path of the django project which need to be tested) "
}
else{
    npm run build;
    Write-Output `n;
    Set-Location dist;
    if ( (Test-Path static) -and (Test-Path index.html) ){
        if($args[0][-1] -ne '/' -or $args[0][-1] -ne '\'){
            $args[0] = $args[0]+"\";
        }
        $dest_path = $args[0];
        if(!(Test-Path $dest_path"\init\staticcopy") ){
            $path = $dest_path + "init\staticcopy";
            $copy = "staticcopy";
            mkdir $dest_path"init\staticcopy";
            Copy-Item -Path $dest_path"init\static" -Destination $dest_path"init\staticcopy" -recurse;
            Write-Host -NoNewline "Create backup file for origin "($copy).Substring(0,6)" file as $copy in $path";
            Write-Output `n;
        }
        if (!(Test-Path $dest_path"init\templates\copy")){
            $path = $dest_path + "init\templates\copy";
            $copy = "index.html.copy";
            mkdir $dest_path"init\templates\copy";
            Copy-Item $dest_path"init\templates\index.html" $dest_path"init\templates\copy";
            Write-Host -NoNewline "Create backup file for origin "($copy).Substring(0,10)" file as $copy in $path";
            Write-Output `n;
        }
        if(!(Test-Path $dest_path"copy")){
            $path = $dest_path;
            $copy = "db.sqlite3.copy";
            mkdir $dest_path"copy";
            Copy-Item $dest_path"db.sqlite3" $dest_path"copy";
            Write-Host -NoNewline "Create backup file for origin "($copy).Substring(0,10)" file as $copy in $path";
            Write-Output `n;
        }
        Write-Output "Transition the production ...";
        Copy-Item static $dest_path"init" -recurse -ErrorAction "SilentlyContinue";
        Copy-Item index.html $dest_path"init\templates" -recurse -ErrorAction "SilentlyContinue";
        Write-Output "Transition success";
        Set-Location $dest_path;
        python manage.py runserver;
    }
    else{
        Write-Error "The 'static directory' or 'index.html' doesn't exist"
    }
}